# Informações da Solução

- Tecnologias utilizadas:
	- Back-end: Node.js
	- Banco de Dados: MongoDB
	- Teste: Mocha e chai

Os testes estão no arquivo src/test/planet.js

## Passo a Passo para executar o projeto

### Executar o MongoDB
```
cd ./docker/ && docker-compose up
```
se quiser rodar uma instalação propria do MongoDB,
configurar o *host* e *port* no arquivo src/database/index.js

### Instalar as dependencias do Node.js
```
npm install
```

### Rodar os Testes
```
npm test
```

### Rodar o Node.js
```
npm start
```

### Rotas

	* Adicionar um planeta: 
		[POST] http://localhost:3000/starwars/planets
		[body] { "name": "Coruscant", "climate": "temperate", "terrain": "cityscape, mountains" }
	
	* Listar planetas: 
		[GET] http://localhost:3000/starwars/planets/
	
	* Buscar por nome:
		[GET] http://localhost:3000/starwars/planets/?name=<Nome>
	
	* Buscar por ID:
		[GET] http://localhost:3000/starwars/planets/<Id>
	
	* Remover planeta:
		[DELETE] http://localhost:3000/starwars/planets/<Id>
