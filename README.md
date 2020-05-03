# erpoletaapent

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment
Project is setup to run on a Kubernetes cluster.
To deploy, do the following:
1. Create a new Docker image and upload to Ducker Hub (or other repository).
2. Change `deployment/polet-secret.yml` apiKey to actual Vinmonopolet API key.
3. Set container image in `deployment/polet-deployment.yml` to the container image created in step 1.
4. Apply the configuration files `polet-secret.yml`, `polet-deployment.yml`, `polet-service.yml` and 
`polet-ingress.yml` to a Kubernetes cluster with `cert-manager` for automatic certificate generation.
