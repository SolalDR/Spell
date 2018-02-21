# Spell

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version : 2.3.3

* Rails : 5.0.6

* Database creation 
`rails db:create`

* Database initialization
`rails db:seed`


## Architecture Scene

### Background

- Image Static
- Animated Background

### Scene

- Character
- Environnement

### Foreground

- Text
- Animated Foreground

### Postpros


## Detail component

- Image Static
Background Image sous forme de Markup. 
Dispose d'une vitesse inertielle par rapport au mouvement de la scène. 

- Animated Background
Mesh three.js avec geometry et material custom. Mesh indépendante de la scène, dispo de deux potentiel d'intéraction: u_time pour leur propre animation et u_mouse

- Character 
Mesh custom avec rig / geometry / material.
keyframes des positions, rotations, scale dans la scène par rapport au TextState*

- Environnement
Mesh custom avec geometry / material.
keyframes des positions, rotations, scale dans la scène par rapport au TextState*

- Text : Il s'agit du texte
	- Position dans l'écran
	- TextStates { :string , :int }
	- style (:string)

- AnimatedForeground
Mesh three.js avec geometry et material custom. Mesh indépendante de la scène, dispo de deux potentiel d'intéraction: u_time pour leur propre animation et u_mouse



