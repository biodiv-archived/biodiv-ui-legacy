export const counter = $n => {
  var $n_format = null;
  var $suffix = null;
  if ($n > 0 && $n < 1000) {
    $n_format = Math.floor($n);
    $suffix = "";
  } else if ($n === 1000) {
    $n_format = Math.floor($n / 1000); //For PHP only use floor function insted of Math.floor()
    $suffix = "K";
  } else if ($n > 1000 && $n < 1000000) {
    $n_format = Math.floor($n / 1000);
    $suffix = "K+";
  } else if ($n === 1000000) {
    $n_format = Math.floor($n / 1000000);
    $suffix = "M";
  } else if ($n > 1000000 && $n < 1000000000) {
    $n_format = Math.floor($n / 1000000);
    $suffix = "M+";
  } else if ($n === 1000000000) {
    $n_format = Math.floor($n / 1000000000);
    $suffix = "B";
  } else if ($n > 1000000000 && $n < 1000000000000) {
    $n_format = Math.floor($n / 1000000000);
    $suffix = "B+";
  } else if ($n === 1000000000000) {
    $n_format = Math.floor($n / 1000000000000);
    $suffix = "T";
  } else if ($n >= 1000000000000) {
    $n_format = Math.floor($n / 1000000000000);
    $suffix = "T+";
  }

  return ($n_format + $suffix).length > 0 ? $n_format + $suffix : 0;
};
