import appState from '@builder.io/app-context';

export async function saveBlocks(modelName: string, entryId: string, blocks: any[]) {
  // gets the private key from space to be used in Write API.
  // https://www.builder.io/c/docs/write-api#patch
  const privateKey = await appState?.globalState?.getPluginPrivateKey("Auto generated")

  const response = await fetch(
    `https://builder.io/api/v1/write/${modelName}/${entryId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        data: {
          blocks
        }
      }),
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${privateKey}`
      },
    }
  );
  const data = await response.json();
  const success = await response.ok;
  return {
    data,
    success
  };
}