export const lambdaHandler = async (event: any): Promise<any> => {


    const token: string = event.authorizationToken.toLowerCase();
    const methodArn: string = event.methodArn;

    console.log(`The event: ${event}`)
    console.log(`The token: ${token}`)
    console.log(`The methodArn: ${methodArn}`)

    switch (token) {
        case 'allow':
            return generateAuthResponse('user', 'Allow', methodArn);
        default:
            return generateAuthResponse('user', 'Deny', methodArn);
    }
}

function generateAuthResponse(principalId: string, effect: string, methodArn: string): any {
    const policyDocument: any = generatePolicyDocument(effect, methodArn);

    return {
        principalId,
        policyDocument
    }
}

function generatePolicyDocument(effect: string, methodArn: string): any {
    if (!effect || !methodArn) return null;

    const policyDocument: any = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn
        }]
    };

    return policyDocument;
}
