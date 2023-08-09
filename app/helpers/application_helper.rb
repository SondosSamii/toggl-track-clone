module ApplicationHelper
  def pad(val)
    valString = val.to_s;
    if (valString.length < 2)
      "0" + valString;
    else
      valString;
    end
  end

  def convert_time_elapsed(total_seconds)
    minutes = pad((total_seconds / 60).to_i)
    seconds = pad(total_seconds % 60)
    { minutes: minutes, seconds: seconds }
  end
end
