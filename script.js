async function getPrice() {
  const address = document.getElementById('tokenAddress').value.trim();
  const resultDiv = document.getElementById('result');
  
  if (!address) {
    resultDiv.innerHTML = "Enter a token address first";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${address}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.pairs || data.pairs.length === 0) {
      resultDiv.innerHTML = "Token not found on Polygon";
      return;
    }

    // Get the first Polygon pair
    const pair = data.pairs.find(p => p.chainId === 'polygon') || data.pairs[0];
    const price = parseFloat(pair.priceUsd).toFixed(6);
    const name = pair.baseToken.name;
    const symbol = pair.baseToken.symbol;

    resultDiv.innerHTML = `
      <strong>${name} (${symbol})</strong><br>
      Price: $${price}
    `;
  } catch (err) {
    resultDiv.innerHTML = "Error fetching price. Check the address.";
  }
}
