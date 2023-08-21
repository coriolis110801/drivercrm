    const mailerliteService = {
      fetchGroups: async function () {
        const apiKey = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2MxNmEzYjBhYWExMzBiNzlkZTIyNDU4N2I2ZjE1NjdmNDNiZGY3MmYwODZhNjZiZGI3ZTFiMDE3MWVmZjYzNWVjMGIzZjVhNzA5MzIzYjIiLCJpYXQiOjE2OTA0NjQ1NzguMzYzOTE1LCJuYmYiOjE2OTA0NjQ1NzguMzYzOTE4LCJleHAiOjQ4NDYxMzgxNzguMzU1MTU3LCJzdWIiOiI1NTc3NzAiLCJzY29wZXMiOltdfQ.M5hOGSO5DZnu1EppKAIqYhEdP1Qy0kKpO09a1tYbaziA_TQo06GjzRE1KvK9e-s9uzj2XgKIjpAonDfipIWCkV4826VoPiAwOH-uCtPHDPSon785tzAmO4Nabod5SfUq0NJUWZzLd3XTBxF4ol6HB5obw2dmGXtk0zAo4GYaDSv3-QN6ikNjKsnJoIBsB3uQBe-GiCCMrlmaYULMBjk-V4khejyR6Dp-Vl-8OdK48lz6xj0qtbxMNi7BbnhBHRB6ISwSHPmJBFQ6baqO6Gnpas4GrlulyUUWtD4z-iBPJ712UI-sLkfnOMMQdzxfeOPbRC5YUU9nZ-1TIatbjBmwLckGhDPhanSXr5QcsDL9JnVRC_5RhvnOXD6C1_lFqO1BtEDYN6SSRNSvjFIq4Z_mR7Oaa81vQWYpVhyqNc9qfp2tgfIv2cNNGN0zrT1iJXB1dDnSNh9OfhsdEVDoacP139u2T5sFJnRSqpHeWICXKr8EqeqXXGkE2WV-lElF1hHO5B2O0DkWDuZIr2bzEMVuT11J1OCGyjyHG1WeXlAP6M7wK4zLEcgF8VnyVwbOPifOu3Eo__uwMJTWPwJ5RW-N3uZHmfHbUa-IjgMW6PmEbJcKwplehuaPvy5O-mPl6cT42tP2vVNlkznhVBtJoticMS3M7BY4-GgecP-vaoyuJVY";
          const response = await fetch("https://connect.mailerlite.com/api/groups", {
              headers: {
                  "Authorization": apiKey
              }
          });
          const data = await response.json();

          return data.data
      }
    }

通讯录API
https://developers.mailerlite.com/docs/#mailerlite-api