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
python
def get_user(user_id: int) -> dict:
    """
    Retorna un diccionario con la información del usuario según su ID.
    """
    pass
Documentar componentes y funciones en JS con comentarios claros:

js

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
python

# Correcto
def calculate_total(items):
    total = sum(items)
    return total

# Incorrecto
def calculateTotal(items):
    total=sum(items)
    return total

JavaScript
js

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

bash
Copiar
Editar
pip install black
black backend/
JavaScript / React: ESLint + Prettier

bash
Copiar
Editar
npm install eslint prettier --save-dev
npx eslint --init
npx prettier --write frontend/
## 6. Aplicación de reglas
Todo el código nuevo debe pasar los linters antes de hacer commit.

Mantener consistencia de nombres, indentación y comentarios en todas las carpetas.

Revisar ejemplos del archivo para evitar errores de estilo.


## 1. Reglas de Nomenclatura

### Variables
- Utilizar `snake_case`.
- Ser descriptivas pero concisas.
- Evitar abreviaturas innecesarias.

 Ejemplos aceptados:
```python
user_name = "Carlos"
total_price = 250.0
 Ejemplos no aceptados:

python
Copiar
Editar
UserName = "Carlos"
tp = 250.0
Clases
Utilizar PascalCase.

✅ Ejemplo aceptado:

python
Copiar
Editar
class UserProfile:
    pass
  Ejemplo no aceptado:

python
Copiar
Editar
class user_profile:
    pass
Funciones y Métodos
Utilizar snake_case.

Ser verbales y claras.

 Ejemplo Aceptado:

python
Copiar
Editar
def get_user_data():
    pass
Ejemplo no aceptado:

python
Copiar
Editar
def GetUserData():
    pass
2. Comentarios y Documentación
Usar comentarios solo donde sea necesario.

Escribir docstrings para funciones y clases.

Utilizar comillas triples """ para docstrings.

 Ejemplo aceptado:



def calculate_total(price, tax):
    """
    Calcula el total con impuestos.
    """
    return price + tax
 Ejemplo no aceptado:

# Esta función hace un cálculo
def calc(price, tax):
    return price + tax
3. Identación y Estilo
Utilizar 4 espacios por nivel de indentación (no tabs).

Limitar líneas a 79 caracteres.

Separar funciones con una línea en blanco.

Usar comillas simples o dobles, pero ser consistente.

 Ejemplo aceptado:

def login():
    user = request.form['user']
    return redirect('/home')
 Ejemplo no aceptado:

def login():
 user=request.form["user"]
 return redirect("/home")

4. Herramientas de Estilo
Linter y Formateador
Black: formateador automático para código Python.