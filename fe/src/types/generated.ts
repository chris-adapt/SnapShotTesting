/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/snap-shots": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["handle_get_snapshot_history"];
        put?: never;
        post: operations["handle_snapshot"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/snap-shots/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["handle_get_snapshot_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jobs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["handle_get_all_running_jobs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jobs/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["handle_get_job_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CompareImagesReturn: {
            created_images_paths: string[];
            deleted_images_paths: string[];
            diff_images_paths: string[];
        };
        SnapShotBatch: {
            /** Format: date-time */
            created_at: string;
            diff_images_paths: components["schemas"]["CompareImagesReturn"];
            /** Format: uuid */
            id: string;
            name: string;
            new_images_paths: string[];
            new_story_book_version: string;
            old_images_paths: string[];
            old_story_book_version: string;
        };
        SnapShotBatchJob: {
            /** Format: date-time */
            created_at: string;
            /** Format: uuid */
            id: string;
            /** Format: float */
            progress: number;
            /** Format: uuid */
            snap_shot_batch_id?: string | null;
            status: components["schemas"]["SnapShotBatchJobStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        SnapShotBatchJobStatus: "Pending" | "Processing" | "Completed" | "Failed";
        SnapShotParams: {
            new?: string | null;
            old?: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    handle_get_snapshot_history: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Partner account was created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SnapShotBatch"][];
                };
            };
        };
    };
    handle_snapshot: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SnapShotParams"];
            };
        };
        responses: {
            /** @description Partner account was created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SnapShotBatch"];
                };
            };
        };
    };
    handle_get_snapshot_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Historical Item Id */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Partner account was created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SnapShotBatch"][];
                };
            };
        };
    };
    handle_get_all_running_jobs: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Jobs found successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SnapShotBatchJob"][];
                };
            };
            /** @description Jobs not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    handle_get_job_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Job ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Jobs found successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SnapShotBatchJob"];
                };
            };
            /** @description Jobs not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
