use chrono::NaiveDateTime;
use serde::{self, Deserialize, Deserializer, Serializer};

const FORMAT: &'static str = "%Y-%m-%d %H:%M:%S";

// The signature of a serialize_with function must follow the pattern:
//
//    fn serialize<S>(&T, S) -> Result<S::Ok, S::Error>
//    where
//        S: Serializer
//
// although it may also be generic over the input types T.
pub fn serialize<S>(date: &NaiveDateTime, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    let s = format!("{}", date.format(FORMAT));
    serializer.serialize_str(&s)
}

// The signature of a deserialize_with function must follow the pattern:
//
//    fn deserialize<'de, D>(D) -> Result<T, D::Error>
//    where
//        D: Deserializer<'de>
//
// although it may also be generic over the output types T.
pub fn deserialize<'de, D>(deserializer: D) -> Result<NaiveDateTime, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    let naive_date_time = NaiveDateTime::parse_from_str(&s, "%Y-%m-%d %H:%M:%S").unwrap();
    // Parse the string back to a DateTime.
    return Ok(naive_date_time);
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::{NaiveDate, NaiveTime};
    use serde::{Deserialize, Serialize};

    #[derive(Debug, PartialEq, Serialize, Deserialize)]
    struct TestData {
        #[serde(with = "super")]
        date: NaiveDateTime,
    }

    #[test]
    fn test_serialization() {
        let date = NaiveDateTime::new(
            NaiveDate::from_ymd_opt(2023, 12, 25).unwrap(),
            NaiveTime::from_hms_micro_opt(08, 30, 0, 0).unwrap(),
        );
        let test_data = TestData { date };

        let expected_json = r#"{"date":"2023-12-25 08:30:00"}"#;
        let serialized = serde_json::to_string(&test_data).unwrap();

        assert_eq!(serialized, expected_json);
    }

    #[test]
    fn test_deserialization() {
        let json = r#"{"date":"2023-12-25 08:30:00"}"#;
        let expected_date = NaiveDateTime::new(
            NaiveDate::from_ymd_opt(2023, 12, 25).unwrap(),
            NaiveTime::from_hms_micro_opt(08, 30, 0, 0).unwrap(),
        );
        let deserialized: TestData = serde_json::from_str(json).unwrap();

        assert_eq!(deserialized.date, expected_date);
    }
}
