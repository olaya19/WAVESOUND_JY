# Guia_EstandaresCodigo.md
## 1. Reglas de nombres
Python (Backend)
Elemento	Convención	Ejemplo correcto	Ejemplo incorrecto
Variables	snake_case	user_name	UserName, username
Funciones	snake_case	get_user()	GetUser(), getUser()
Clases	PascalCase	UserController	user_controller, usercontroller
Constantes	MAYUSCULA_SEPARADA_POR_GUION_BAJO	MAX_RETRIES	MaxRetries

JavaScript / React (Frontend)
Elemento	Convención	Ejemplo correcto	Ejemplo incorrecto
Variables	camelCase	userName	user_name, UserName
Funciones	camelCase	getUser()	GetUser(), get_user()
Componentes	PascalCase	UserCard	userCard, usercard
Constantes	UPPER_SNAKE_CASE	API_URL	apiUrl, ApiUrl

## 2. Comentarios y documentación interna
Explicar el qué y el porqué, no el cómo obvio.

Usar docstrings en Python:
def get_user(user_id: int) -> dict:
    """
    Retorna un diccionario con la información del usuario según su ID.
    """
    pass

Documentar componentes y funciones en JS con comentarios claros:

// Componente que muestra la información de un usuario
function UserCard({ user }) {
    return <div>{user.name}</div>;
}

## 3. Identación y estilo de código
Python: 4 espacios por nivel, no usar tab.

JS/React: 2 espacios por nivel.

Mantener líneas ≤ 80-100 caracteres.

Abrir llaves {} en la misma línea en JS.

Evitar espacios innecesarios al final de la línea.

## 4. Ejemplos aceptados y no aceptados

Python
# Correcto
def calculate_total(items):
    total = sum(items)
    return total

# Incorrecto
def calculateTotal(items):
    total=sum(items)
    return total

JavaScript

// Correcto
const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + item, 0);
};

// Incorrecto
function CalculateTotal(items){
return items.reduce((a,b)=>a+b,0)
}

## 5. Linters y formateadores
Python: Black

pip install black
black backend/


JavaScript / React: ESLint + Prettier

npm install eslint prettier --save-dev
npx eslint --init
npx prettier --write frontend/


## 6. Aplicación de reglas
Todo el código nuevo debe pasar los linters antes de hacer commit.

Mantener consistencia de nombres, indentación y comentarios en todas las carpetas.

Revisar ejemplos del archivo para evitar errores de estilo.

