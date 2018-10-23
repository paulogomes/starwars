# Informações da Solução

## Executar o MongoDB
```
cd ./docker/ && docker-compose up
```
se quiser rodar uma instalação propria do MongoDB,
configurar o *host* e *port* no arquivo src/database/index.js

## Instalar as dependencias do Node.js
```
npm install
```

## Rodar os Testes
```
npm test
```

## Rodar o Node.js
```
npm start
```

## Rotas

	* Adicionar um planeta: 
		[POST] http://localhost:3000/starwars/planets
		[body] { "name": "Tatooine", "climate": "temperate, tropical", "terrain": "jungle, rainforests" }
	
	* Listar planetas: 
		[GET] http://localhost:3000/starwars/planets/
	
	* Buscar por nome:
		[GET] http://localhost:3000/starwars/planets/?name=<Nome>
	
	* Buscar por ID:
		[GET] http://localhost:3000/starwars/planets/<Id>
	
	* Remover planeta:
		[DELETE] http://localhost:3000/starwars/planets/<Id>