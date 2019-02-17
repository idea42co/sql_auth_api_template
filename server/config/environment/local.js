const environmentConfig = {
    environmentName: 'local',
    sequelizeConfig: {
        database: 'applicationname',
        userName: 'sa',
        password: 'sa',
        settings: {
            dialect: 'sqlite',
            storage: 'applicationname.sqlite'
        }
    },
    jwt: {
        auidence: 'applicationname',
        issuers: {
            client: {
                publicKey: '2262CE66E91F8EE3A48A6F4B76353'
            },
            server: {
                publicKey: '8C43916375D1A11D8B914C9DB62F6'
            }
        }
    }
}

export { environmentConfig }