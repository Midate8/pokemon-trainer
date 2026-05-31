function PokemonCard({number, name}) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
    // Capitalize first letter (/￣ー￣)/~~☆’.･.･:★’.･.･:☆
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    
    return (
        <div
            style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px",
                width: "200px"
            }}>
            <img src={imageUrl} alt={name} />
            
            <p>
                #{number} {displayName}
            </p>
        </div>
    );
}
export default PokemonCard;