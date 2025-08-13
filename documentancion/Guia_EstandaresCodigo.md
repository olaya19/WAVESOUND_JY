# Guía de Estándares de Codificación – WaveSound

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