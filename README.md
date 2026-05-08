# backoffice

commande pour simuler un ticket : 
curl -X POST http://localhost:4000/admin/support/69fafea87b44fd201d5e80e1/simulate-reply   -H "Content-Type: application/json"   -d '{
    "userId": "67efa009e2ac321b5eb5813c",
    "content": "Réponse simulée utilisateur"
  }'