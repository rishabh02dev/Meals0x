import React, { useState, useEffect } from "react";

const Meal = () => {
  const [mealData, setMealData] = useState([]);
  const [area, setArea] = useState("indian");
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const api = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        const data = await api.json();
        console.log(data.meals);
        setMealData(data.meals);
      } catch (error) {
        console.error("Error fetching the meal data:", error);
      }
    };

    fetchDataFromAPI();
  }, [area]);

  // Fetch meals based on the search query
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await api.json();
      setMealData(data.meals || []); // Set the meals or an empty array if no results found
    } catch (error) {
      console.error("Error searching for meals:", error);
    }
  };

  return (
    <>
      <div className="mx-auto text-center my-5">
        <h1
          className="mb-5"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#333" }}
        >
          Explore Meals by Cuisine
        </h1>

        {/* Search Bar */}
        <form
          className="d-flex justify-content-center mb-4"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search for a meal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "300px", marginRight: "10px" }}
          />
          <button type="submit" className="btn btn-danger">
            Search
          </button>
        </form>

        <div className="btn-group">
          {[
            "Indian",
            "American",
            "Thai",
            "Japanese",
            "Canadian",
            "British",
            "Russian",
          ].map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setArea(cuisine.toLowerCase())}
              type="button"
              className="btn btn-primary mx-2"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "30px",
                padding: "10px 20px",
                transition: "all 0.3s ease",
              }}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="row">
          {mealData && mealData.length > 0 ? (
            mealData.map((data) => (
              <div className="col-md-4 col-sm-6 mb-4" key={data.idMeal}>
                <div
                  className="card shadow-lg"
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 10px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src={data.strMealThumb}
                    alt={data.strMeal}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "15px 15px 0 0",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <div
                    className="card-body text-center"
                    style={{ padding: "15px", backgroundColor: "#fff" }}
                  >
                    <h5
                      className="card-title"
                      style={{
                        color: "#e63946",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {data.strMeal}
                    </h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p
              className="text-center"
              style={{ fontSize: "18px", color: "#555" }}
            >
              No meals found. Try a different search or choose a cuisine.
            </p>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer
        className="text-center mt-5"
        style={{ padding: "20px", backgroundColor: "#333", color: "#fff" }}
      >
        <p>
          Developed by{" "}
          <a
            href="https://github.com/rishabh02dev"
            style={{ color: "#e63946" }}
          >
            rishabh02dev
          </a>
        </p>
        <p>
          <a
            href="https://github.com/rishabh02dev/your-repo-link"
            style={{ color: "#e63946" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fork this project on GitHub
          </a>
        </p>
      </footer>
    </>
  );
};

export default Meal;
