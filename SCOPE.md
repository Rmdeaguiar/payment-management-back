# Desafio final Cubos Academy

## Usuário

### O que pode fazer:
- Fazer login
- Fazer cadastro
- Atualizar informações do usuário
- Cadastrar cliente
- Atualizar cliente
- Cadastrar cobrança
- Listar todas as cobranças
- Listar cobranças de cliente


### O que não pode fazer:
- Apagar cliente
- Apagar cobrança

## Endpoints - Usuários

### POST /sign-up

#### Dados enviados

```json=
{
    "name": "exemplo",
    "email": "exemplo@exemplo.com",
    "password": "exemplo"
}
```

#### Dados recebidos
- Sucesso
```json=
"O usuário foi cadastrado"
```

- Erros
```jsonld=
"O campo nome é obrigatório"
```

```jsonld=
"O campo email é obrigatório"
```

```jsonld=
"O campo senha é obrigatório"
```

```jsonld=
"O email já existe"
```

```jsonld=
"Não foi possível cadastrar o usuário"
```

---

### POST /login

#### Dados enviados

```json=
{
	"email": "admin@exemplo.com",
	"password": "exemplo"
}
```

#### Dados recebidos
- Sucesso
```json=
{
	"user": {
        "id": 1,
        "name": "exemplo",
        "email": "exemplo@exemplo.com",
        "cpf": null,
        "phone": null
    },
    "token": "exemplo"
}
```

- Erros
```jsonld=
"O campo email é obrigatório"
```

```jsonld=
"O campo senha é obrigatório"
```

```jsonld=
"O usuario não foi encontrado"
```

```jsonld=
"Email e senha não conferem"
```

---

### GET /get-user

#### Dados recebidos
- Sucesso

```json=
{
    "id": 1,
    "name": "exemplo",
    "email": "exemplo@exemplo.com",
    "cpf": null,
    "phone": null
}
```

- Erro
```jsonld=
"O usuario não foi encontrado"
```

---

### PUT /update-user

#### Dados enviados

```json=
{
    "name": "exemplo",
    "email": "exemplo@exemplo.com",
    "cpf": "00011122203",
    "phone":"11999999999",
    "password": "exemplo"
}
```

#### Dados recebidos
- Sucesso

```json=
{
"Usuário atualizado com sucesso"
}
```

- Erros
```jsonld=
"O campo nome é obrigatório"
```

```jsonld=
"O campo email é obrigatório"
```

```jsonld=
"O campo senha é obrigatório"
```

```jsonld=
"O usuário não foi atualizado"
```

---

### POST /clients

#### Dados enviados

```json=
{
    "name": "exemplo",
    "email": "exemplo@exemplo.com",
    "cpf": "00011122203",
    "phone":"11999999999",
}
```

#### Dados recebidos
- Sucesso

```json=
[
	{
		"id": 1,
		"name": "exemplo",
		"email": "exemplo@exemplo.com",
		"cpf": "00011122203",
		"phone": "11999888888",
		"cep": null,
		"publicplace": null,
		"complement": null,
		"district": null,
		"city": null,
		"state": null,
		"status": "Inadimplente"
	}
]
```

- Erros
```jsonld=
"O campo nome é obrigatório"
```

```jsonld=
"O campo email é obrigatório"
```

```jsonld=
"O campo cpf é obrigatório"
```

```jsonld=
"O campo senha é obrigatório"
```

```jsonld=
"Esse email já está cadastrado"
```

---

### GET /get-clients

#### Dados recebidos
- Sucesso

```json=
[
	{
		"id": 1,
		"name": "exemplo",
		"email": "exemplo@exemplo.com",
		"cpf": "00011122203",
		"phone": "11999888888",
		"cep": null,
		"publicplace": null,
		"complement": null,
		"district": null,
		"city": null,
		"state": null,
		"status": "Inadimplente"
	},
    {
		"id": 2,
		"name": "exemplo",
		"email": "exemplo2@exemplo.com",
		"cpf": "00011122204",
		"phone": "11999888887",
		"cep": null,
		"publicplace": null,
		"complement": null,
		"district": null,
		"city": null,
		"state": null,
		"status": "Inadimplente"
	}
]
```

- Erro
```jsonld=
"Nenhum cliente encontrado"
```

---

### GET /get-client/:id
- Sucesso

```json=
[
	{
		"id": 1,
		"name": "exemplo",
		"email": "exemplo@exemplo.com",
		"cpf": "00011122203",
		"phone": "11999888888",
		"cep": null,
		"publicplace": null,
		"complement": null,
		"district": null,
		"city": null,
		"state": null,
		"status": "Inadimplente"
	}
]
```

- Erro
```jsonld=
"Nenhum cliente encontrado"
```

---

### PUT /update-client/:id

#### Dados enviados

```json=
{
    "name": "exemplo",
    "email": "exemplo@exemplo.com",
    "cpf": "00011122203",
    "phone":"11999999999",
}
```

#### Dados recebidos
- Sucesso

```json=
"Cliente atualizado com sucesso"
```

- Erros
```jsonld=
"O campo nome é obrigatório"
```

```jsonld=
"O campo email é obrigatório"
```

```jsonld=
"O campo cpf é obrigatório"
```

```jsonld=
"O campo senha é obrigatório"
```

```jsonld=
"O email já está cadastrado"
```

```jsonld=
"O CPF já está cadastrado"
```

```jsonld=
"Cliente não foi atualizado"
```

---
### POST /charges

#### Dados enviados

```json=
{
    "client_id": 1,
    "nameclient": "exemplo",
    "description": "descricao da cobranca",
    "statuscharge": "pendente",
    "value": "200,00",
    "due_date": "2022-06-30"
}
```

#### Dados recebidos
- Sucesso

```json=
"Cobrança cadastrada com sucesso"
```

- Erros
```jsonld=
"Status de cobrança inválido"
```

```jsonld=
"Cobrança não foi cadastrada"
```

---
### GET /get-charges

#### Dados recebidos
- Sucesso

```json=
[
    {
        "id": 1,
        "client_id": 1,
        "nameclient": "exemplo",
        "description": "descricao da cobranca",
        "statuscharge": "pendente",
        "value": "200,00",
        "due_date": "2022-06-30"
    },
    {
        "id": 2,
        "client_id": 3,
        "nameclient": "exemplo",
        "description": "descricao da cobranca",
        "statuscharge": "pago",
        "value": "250,00",
        "due_date": "2022-06-30"
    }
]
```

- Erro
```jsonld=
"Não existem cobranças"
```

---

### GET /get-charges/:id

#### Dados recebidos
- Sucesso

```json=
[
    {
        "id": 1,
        "client_id": 1,
        "nameclient": "exemplo",
        "description": "descricao da cobranca",
        "statuscharge": "pendente",
        "value": "200,00",
        "due_date": "2022-06-30"
    },
    {
        "id": 3,
        "client_id": 1,
        "nameclient": "exemplo",
        "description": "descricao da cobranca",
        "statuscharge": "pendente",
        "value": "30,00",
        "due_date": "2022-08-30"
    }
]
```

- Erro
```jsonld=
"Não existem cobranças para esse cliente"
```
