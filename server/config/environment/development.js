/*
    Regarding the JWT section: 

    management:
        Valid Options: 
            'none', 'onePerUser', 'multiplePerUser'

        If set to none: 
            We won't manage tokens in the database
        If set to onePerUser: 
            We will manage tokens in the database. Newly issued tokens will expire already issued tokens.
        If set to multiplePerUser:
            We will manage tokens in the database. Tokens can be expired by removing the token from the database.

    mapPerUser: 
        0 or -1 is unlimited, and is only useful with multiplePerUser configuration

        If set to something >1, and with multiplePerUser set, we will issue tokens up to this threshold, and expire older ones as needed.
*/

const environmentConfig = {
    environmentName: 'development',
    jwt: {
        auidence: 'applicationname',
        issuers: {
            client: {
                publicKey: '2262CE66E91F8EE3A48A6F4B76353'
            },
            server: {
                publicKey: '8C43916375D1A11D8B914C9DB62F6'
            }
        },
        expiresInSeconds: 60 * 60 * 3, //
        management: 'multiplePerUser',
        maxPerUser: 10
    }
}

export { environmentConfig }