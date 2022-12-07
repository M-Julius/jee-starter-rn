/* eslint-disable no-mixed-operators */
type CalculateDistanceProps = {
  myLat: any;
  myLong: any;
  desLat: any;
  desLong: any;
};
export default function calculateDistance({
  myLat,
  myLong,
  desLat,
  desLong,
}: CalculateDistanceProps) {
  const R = 6371;
  const dLat = ((desLat - myLat) * Math.PI) / 100;
  const dLng = ((desLong - myLong) * Math.PI) / 100;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((myLat * Math.PI) / 180) *
      Math.cos((desLat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  if (d > 1) return `${Math.round(d)} km`;
  if (d <= 1) return `${Math.round(d * 1000)} m`;
  return d;
}
