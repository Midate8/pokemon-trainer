function PokemonCard({ number, name, types, height, weight, onCatch, isCaught }) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
    // Capitalize first letter (/￣ー￣)/~~☆’.･.･:★’.･.･:☆
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);

    // Colors for the "pill-badges"
    const typeColors = {
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        psychic: "#F85888",
        normal: "#A8A878",
        poison: "#A040A0",
        bug: "#A8B820",
        flying: "#98D8D8",
        rock: "#B8A038",
        ground: "#E0C068",
        ice: "#98D8D8",
        dragon: "#7038F8",
        ghost: "#705898",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "#EE99AC",
        fighting: "#C03028",
    }

    // Function to create "pill-badges"
    function TypeBadge({ type }) {
        return (
            <span style={{
                backgroundColor: typeColors[type],
                borderRadius: "999px",
                padding: "2px 10px",
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "3px",
            }}>
                {type}
            </span>
        )
    }

    // MAIN
    return (
        <div
            style={{
                margin: "10px",
                padding: "10px",
                width: "50%",
                background: "#f5f5ff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                float: "left",

            }}
        >
            <div className="section-1">
                <img src={imageUrl} alt={name} width="130px" float="left" />
                <span className="span-name">{displayName}</span>
                <button disabled={isCaught} className="catch-button" onClick={() => onCatch(number)}>
                    {isCaught ? "Caught" : "Catch"}
                </button>
            </div>

            <div className="section-2">
                <span className="dex-number">
                    #{number}
                </span>
                <span>
                    {types.map(type => (
                        <TypeBadge key={type} type={type} />
                    ))}
                </span>
            </div>
        </div>
    );
}
export default PokemonCard;