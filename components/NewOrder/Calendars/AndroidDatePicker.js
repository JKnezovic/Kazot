import DateTimePicker from "@react-native-community/datetimepicker";

export default function AndroidDatePicker({ orderState, onChange }) {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={orderState.date}
      mode="date"
      is24Hour={true}
      onChange={onChange}
    />
  );
}
