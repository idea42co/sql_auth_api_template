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
            },
            expiresInSeconds: environmentConfig.jwt.expiresInSeconds || 60 * 60 * 24, // Token will expire in 1 day by default (60 * 60 * 24)
            management: environmentConfig.jwt.management,
            maxPerUser: environmentConfig.jwt.maxPerUser
        }
    }
}

export default prepareConfiguation();