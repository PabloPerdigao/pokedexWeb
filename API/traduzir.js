
// função que chama API do Google, fazendo a conexão com a chave hospedada no Vercel, enviando o texto a ser traduzido 
export default async function handler(req, res) {

  // Garantimos que a nossa API  POST
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const txtEn = req.body.texto;

  // Acessamos o Vercel para pegar a chave do Google
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    // Fazemos o POST para o Google
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: txtEn, // frase
        source: "en", // idioma origem
        target: "pt", // tradução
        format: "text" 
      })
    });

    const data = await response.json();
    const textoTraduzido = data.data.translations[0].translatedText;

    // tradução feita envia ao front
    return res.status(200).json({ traduzido: textoTraduzido });

  } catch (error) {
    
    return res.status(500).json({ erro: 'Falha ao traduzir no servidor' });
  }
}