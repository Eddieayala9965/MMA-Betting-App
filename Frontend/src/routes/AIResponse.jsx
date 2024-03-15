import { useState } from "react";
// you need to use react roiter dom to import useloaderdata

const AIResponse = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const key = import.meta.env.VITE_OPEN_API_AIKEY;

  const fetchData = async () => {
    try {
      const fighterResponse = await fetch("http://localhost:4000/fighters");
      const dataResponse = await fighterResponse.json();

      const fighterOddsResponse = await fetch("http://localhost:4001/odds");
      const dataFighterOdds = fighterOddsResponse.json();

      const message = {
        role: "system",
        content: `Provide me with the name of a UFC fighter, and I'll give you three sentences about their stats and odds. If you ask for odds, I'll explain why they're that way and pull them from DraftKings only. Please ensure you input a valid UFC fighter's name. If you ask for odds, I'll provide them regardless of whether they're up to date, sourced from DraftKings and show the odds to the user.
        : ${JSON.stringify(dataFighterOdds)}${JSON.stringify(dataResponse)}`,
      };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              message,
              {
                role: "user",
                content: inputText,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      setResult(data.choices[0].message.content);
    } catch (error) {
      console.error("Unable to fetch data:", error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <input
              type="text"
              className="form__input searchbars"
              value={inputText}
              onChange={handleInputChange}
              placeholder="fighter."
              required=""
            />
          </div>

          <button onClick={fetchData}>Press</button>
          <div>{result}</div>
        </div>
      </div>
    </div>
  );
};

export default AIResponse;
