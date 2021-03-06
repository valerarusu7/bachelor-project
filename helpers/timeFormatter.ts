export default function convertToTimeSpan(
  startDate: string,
  endDate: string
): string {
  const time = Math.abs(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000
  );
  var date = new Date(0);
  date.setSeconds(time);
  return date.toISOString().substr(11, 8);
}
