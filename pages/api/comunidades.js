import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.TOKEN;
  
    const client = new SiteClient(TOKEN);
    const registroCriado = await client.items.create({
      itemType: '975437',
      ...request.body,
    })
  
    response.json({
      dados: 'hsjdhfslh',
      registroCriado,
    })
    return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  })
}