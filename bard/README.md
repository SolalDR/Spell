# Bard

Framework 2.5D dépendant de Three.js

## Components

- Dictionnary
- Speech Regognition

### Dictionnary

### SpeechRecognition

## Book

- `title` : String
- `author` : String
- `fragments` : [Fragment]

## Scene

- `canvas` : HTMLElement
- `threeScene` : THREE.Scene
- `camera` : THREE.PerspectiveCamera
- `renderer` : THREE.WebGLRenderer
- `bgGroup` : THREE.Group
- `mainGroup` : THREE.Group
- `fgGroup` : THREE.Group

## Fragment 

- `book` : Book
- `elements` : [Element]
- `raf` : function


## Element 

- `loaded` : Boolean
- `name` : String
- `type` : Enum


List of objects which extends Element
- Character 
- Mesh
- Text

### Character

### Mesh 

### Text