function isSuccessResponse(response) {
  return (
    response.statusText === 'OK' ||
    response.status === 200 ||
    response.status === 201
  );
}

function responseParser(json) {
  return {
    data: json,
  };
}

export default function (response) {
  return new Promise((resolve) => {
    response.json().then((json) =>
      resolve({
        headers: response.headers,
        status: response.status,
        ok: isSuccessResponse(response),
        ...responseParser(json),
      }),
    );
  });
}
