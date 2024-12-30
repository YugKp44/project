const { BetaAnalyticsDataClient } = require('@google-analytics/data');
require('dotenv').config();

function initializeAnalyticsClient() {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Missing required Google Analytics credentials');
  }

 const credentials = {
    client_email: 'analytics-bolt@dotted-hulling-446110-d3.iam.gserviceaccount.com',
    private_key: `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD3gLLV6CxMtw7n
hVfrNdadgT6uJIlp5GISJ9n/ukaZmSdJIeQ6WNAHFoDt/ejG4+gcwcJWlt8/55IE
eNLrYOpjLy8xuUH83KgqJ22JXrMbhz+qe3fOWKQu047ZYFMlqDMBrx2r8jrVuKeZ
AgQNKbpJCOOr/v6LNS5g88H0p2l8/SXcS7aQxN6hknRz61lx86FCGdksjr+8lA//
EYmABZk+ekXIZoLZ8FvOAESbQP/l9dggd9YCPzs+NlU+L9jv6ogq7nYZiT1L0KHZ
NdsJB/+sPz5h0Sj6cL7z1aAW7zqrBn9ZcEJ9d+8jtlNUNiw//UWgCdiaP3imnp00
gLrPMJKtAgMBAAECggEABb6nJ/+OwQHCEaNO3PGad3xvqS4a7Goge/MQhHbdOvp1
kXp9EtJLPdGKu5DDAul4/UCNaLdxcMkeDVwv6nEM77FsLddyzdI3VbHQQTnWpsMX
D2IfRUWvGzvOMIMjsEI9Bi3Q3qlYLpbDI8eKst2EP+a6FhzB6WxEv9EDRaZPH1db
MQXg1tIIwGS7y2GGTSuumCNzDxcRER/WESuhl6foSfOVj0aV0XXDKSOt+qUzal+0
b/Zo9Zx2sTfVNymD+c3hMQSdGFe+T3GsKki3f81kHYVqbW1/mZCXRjwlvNnGAo56
1miVYgX76wYgj3/4e58XuAcgC3DeSKHB57kCP5zqlwKBgQD/i3O7PIh3KMBUnDHE
nKoU1KqP10QsrP2bFSCQH6G6kS30rWki3ZZ9Ej9eLsWOU01TuO7u0mBW066F/BeO
Hi/Ye+YrFbHTPbluP4XII32Di1Zwq1DeI6RRIU8rHZ8S/RFFyit74r6YQQzM6qiA
EN8mquX7XYC6Bb8jO7769kslMwKBgQD38ZQnwLF+w7aTuGzPQPDXmZqdzx0NmfCh
AVQcIvavjQkVE6w24wmhb4QgdTP+ViMX8LC3nOihUjx0PbyMyr3M5ksAcOTLt4kP
iX7bW2t6GISCn/2UvJGqhVk4FKFvdOFwuNmb5XfMsDkesfEUdBOZ/JlnZNAuX8sN
AYzwS3monwKBgQCxQXbWcoeqN+8pAWsYGR908YsZ2VTltFz5fK8oqXhSZC+/X6Xk
1FV1jfm8h67rKWci4s2BhRXkRFLzh0iDgPbpMBAY5KSDhXYhPhi7GbsPStB7uKmQ
XKK2z+cNXi+gST/46+I7va09CSoq3b5hjtJrDPIX6OTIpAHQG7o+dCbttwKBgQCz
L8i1rgHYrhKN0XP5mGI2PlFKiTri8ITBpxclOnNzTYbpz4zfIdd87v3bAzjvL0sv
awgbum843xjHnTJdwcvHgAtmJzCCtYJ9Uw3186zJ0Vw6luuJiXnwdWyUJfzBcwPW
FhFWJFEfAaBWOZ0T/guIdtBas7XsPdid7qfvpWwn2wKBgQD5t3CKZDeNeVha6Kq1
8EBXS0ptWTaQILTdzapAnRzX7+NdTbdjL7SxRWKoRVmQIXcgMeqlWRZ70HlRQUg9
cDo267CeIBE7KJsEobcnVN7cHErhGn2sgqBrx2s4l1wQ4SdF8eoXKW3p3j3gL7Dt
GHElbJ4Ox9NUQ8jR8NM0huMn3g==
-----END PRIVATE KEY-----`,
  };

  return new BetaAnalyticsDataClient({ credentials });
}

const analyticsDataClient = initializeAnalyticsClient();

module.exports = analyticsDataClient;