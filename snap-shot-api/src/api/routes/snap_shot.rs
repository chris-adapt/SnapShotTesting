use anyhow::Error;
use axum::body::Body;
use axum::http::{Response, StatusCode};
use axum::{extract, response::IntoResponse};
use lib::compare_images::CompareImagesReturn;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::api::errors::AppError;
use crate::models::app_state::AppState;
use crate::service::snap_shot_service;
use axum::extract::State;

#[derive(Debug, Deserialize)]
pub struct SnapShotParams {
    new: Option<String>,
    old: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SnapShotResponse {
    pub id: String,
    pub new_images_paths: Vec<String>,
    pub old_images_paths: Vec<String>,
    pub diff_images_paths: CompareImagesReturn,
}

impl IntoResponse for SnapShotResponse {
    fn into_response(self) -> Response<Body> {
        (
            StatusCode::OK,
            serde_json::to_string(&self).unwrap_or_default(),
        )
            .into_response()
    }
}

pub async fn handle_snap_shot(
    State(state): State<Arc<AppState>>,
    extract::Json(payload): extract::Json<SnapShotParams>,
) -> Result<SnapShotResponse, AppError> {
    let new = match payload.new {
        Some(new) => new,
        None => {
            return Err(AppError(
                Error::msg("New URL is required"),
                StatusCode::BAD_REQUEST,
            ))
        }
    };
    let old = match payload.old {
        Some(old) => old,
        None => {
            return Err(AppError(
                Error::msg("New URL is required"),
                StatusCode::BAD_REQUEST,
            ));
        }
    };

    snap_shot_service::create_snap_shots(new.as_str(), old.as_str(), state.db_pool.clone())
        .await
        .map_err(|e| AppError(e, StatusCode::INTERNAL_SERVER_ERROR))
}
