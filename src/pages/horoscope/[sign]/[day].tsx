import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchHoroscopeData } from "../../api/fetch";
import { signs } from "@/pages/api/data";
import Loading from "@/components/Loading";

const HoroscopeDefaultValues = {
  current_date: "",
  description: "",
  compatibility: "",
  lucky_number: "",
  mood: "",
  lucky_time: "",
  color: "",
};

export default function Results() {
  const [loading, setLoading] = useState(true);
  const [results, setHoroscopeResults] = useState(HoroscopeDefaultValues);
  const [randomResults, setRandomResults] = useState(HoroscopeDefaultValues);

  const router = useRouter();
  const { sign, day } = router.query;
  console.log(sign, day);

  useEffect(() => {
    var randomSign = signs[Math.floor(Math.random() * signs.length)];

    if (sign && day) {
      Promise.all([
        fetchHoroscopeData(sign, day),
        fetchHoroscopeData(randomSign, day),
      ]).then((data) => {
        setHoroscopeResults(data[0])
        setRandomResults(data[1]);
      });
    }
  }, [sign, day]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {sign} horoscope for {results.current_date}
          <p>{results.description}</p>
          <p>The Mood: {results.mood}</p>
          <p>Favorite Color: {results.color}</p>
          <p>Lucky Number: {results.lucky_number}</p>
          <p>Best Friend Today: {results.compatibility}</p>
          <p>Lucky Time: {results.lucky_time}</p>
        </div>
      )}
    </div>
  );
}

// an app that says identify if it's yours or someone else's !
