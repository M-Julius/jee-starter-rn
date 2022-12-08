# React Native Starter Project
StarterKit react native & expo project, with template typescript

# Installation & Update Global
* use npm

    * ```$ npm install -g jee-starter-rn```

* use yarn

  * ```$ yarn global add jee-starter-rn```


# How to use?

You can access it without installing anything globally using ```npx```

```$ npx jee-starter-rn```

- set name your project (ex: StarterAppRn)
- choices your template (ex: react-native (typescript))

# Generator
generator options, on root project

* sample command

  * ```$ npx jee-starter-rn (-generate | -g | generate) (type) (name)```


| Generator    | path dir        | type              |
|--------------|-----------------|-------------------|
| Model        | app/core/model  | model (-m)        |
| Features     | app/features    | feature (-f)      |


run this generator on root project
*  generate model
    * ```$ npx jee-starter-rn -g (model | -m) 'Name Of Model'```

* generate feature
    * ```$ npx jee-starter-rn -g (feature | -f) 'Name Of Feature'```
