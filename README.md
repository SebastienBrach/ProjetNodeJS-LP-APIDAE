# TPHeroku
 
## INITIALISATION
'node index.js' ou 'npm run nodemon' pour run sur le port 3001

## ROUTES
Routes du projet

### GET
• /article : Retourne tous les articles de la BD
• /article/:id : Retourne l'article correspondant à l'id passé en paramamètre
• /articleUser/:id : Retourne tout les articles d'un utilisateur passé en paramètre

### POST
• /addarticle : Ajouter un article 
• /register : Créer un compte
• /login : Se connecter (genère un JWT)

### PUT
• /article/:id : Modifier un article avec l'id de celui-ci passé en paramètre

### DELETE
• /article/:id : Supprime un article avec l'id de celui-ci passé en paramètre


## SOUCIS
JWT non fonctionnel, pour tester les routes nous n'avons pas mis la vérification pour jwt. Nous n'étions pas loin.
