const prepareConfiguation = () => {
    const configFilePath = './environment/' + (process.env.NODE_ENV || 'development')
    const { environmentConfig } = require(configFilePath);

    return {
        environmentName: environmentConfig.environmentName,
        jwt: {
            auidence: environmentConfig.jwt.auidence,
            issuers: {
                client: {
                    publicKey: environmentConfig.jwt.issuers.client.publicKey
                },
                server: {
                    publicKey: environmentConfig.jwt.issuers.server.publicKey
                }
            }
        }
    }
}

export default prepareConfiguation();