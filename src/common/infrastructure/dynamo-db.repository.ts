import * as AWS from 'aws-sdk';

export class DynamoDBRepository {
    private readonly dynamoDB: AWS.DynamoDB.DocumentClient;
    public tableName: string;

  constructor() {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  // Método de ejemplo para obtener un ítem
  protected async getItem(key: object): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
    const params = {
      TableName: this.tableName,
      Key: key,
    };

    const RESULT = await this.dynamoDB.get(params).promise();

    if (this.isEmpty(RESULT)) {
      return null;
    }

    return RESULT['Item'];
  }

  protected async queryItems(params: any): Promise<any> {

    const PARAMS_DYNAMO = {
        TableName: this.tableName,
        ...params
    };
   
    try {
        const data = await this.dynamoDB.query(PARAMS_DYNAMO).promise();
       
        if (data.Items && data.Items.length > 0) {
            // Convertir cada ítem JSON encontrado a SolutionStructure y retornar el array de soluciones
            return data;
            // return data.Items.map(item => SolutionStructure.fromJSON(item));
        } else {
            return null; // No se encontraron soluciones
        }
    } catch (error) {
        console.error('Error retrieving solutions:', error);
        return null;
    }
  }

  protected async putItem(item: AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    const params = {
      TableName: this.tableName,
      Item: item
    };
  
    return this.dynamoDB.put(params).promise();
  }

  protected async updateItem(tableName: string, key: object, updateExpression: string, expressionAttributeValues: any): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    const params = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW"  // Retorna los valores nuevos del registro actualizado
    };
  
    return this.dynamoDB.update(params).promise();
  }

  protected async deleteItem(key: object): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {
    const params = {
      TableName: this.tableName,
      Key: key
    };
  
    return this.dynamoDB.delete(params).promise();
  }

  protected isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  protected async batchGetItems(keys: object[]): Promise<AWS.DynamoDB.DocumentClient.BatchGetItemOutput> {
    const PARAMS_DYNAMO = {
      RequestItems: {
        [this.tableName]: {
          Keys: keys
        }
      }
    };

    try {
      const data = await this.dynamoDB.batchGet(PARAMS_DYNAMO).promise();

      if (data.Responses && data.Responses[this.tableName]) {
        return data
      } else {
        return  null;
      }
    } catch (error) {
      console.error('Error fetching batch items:', error);
      throw new Error('Error fetching batch items');
    }
  }

  protected chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
        array.slice(i * size, i * size + size)
    );
  }
}