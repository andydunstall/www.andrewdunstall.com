/* eslint max-len: "off" */

import React from 'react';

function GraphQLAPI() {
  const snippet1 = `
query GetPosts {
  posts {
    id
    title
    header
    # URL path to the post
    path
  }
}
`;

  const snippet2 = `
query GetPost($id: String!) {
  post(id: $id) {
    title
    body
    created
  }
}
`;

  const snippet3 = `
// ...

const POSTS = gql\`
  query GetPosts {
    posts {
      id
      title
      header
      path
    }
  }
\`;

export default function Routes() {
  let match = useRouteMatch(); 
  const { loading, error, data } = useQuery(POSTS);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />

  return (
    <Switch>
      {
        data.posts.map(post => (
          <Route key={post.id} path={\`\${match.url}/\${post.path}\`}>
            <Post id={post.id} />
          </Route>
        ))
      }
      <Route path={\`\${match.url}\`}>
        <List />
      </Route>
    </Switch>
  );
}
`;

  const snippet4 = `
// ...
<ul>
  {
    data.posts.map(post => (
      <li key={post.id}>
        <h3>{ post.title }</h3>
        <p>{ post.header }</p>
        <Link to={\`\${match.url}/\${post.path}\`}>Read more...</Link>
      </li>
    ))
  }
</ul>
// ...
`;

  const snippet5 = `
// ...

const POST = gql\`
  query GetPost($id: String!) {
    post(id: $id) {
      title
      body
      created
    }
  }
\`;

export default function Post({id}) {
  const { loading, error, data } = useQuery(POST, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />

  return (
    <div className="post">
      <h3>{data.post.title}</h3>
      <p>{data.post.body}</p>
      <p>{data.post.created}</p>
    </div>
  )
}
`;

  const snippet6 = `
CatchAll:
Type: Api
Properties:
  Path: /graphql
  Method: ANY
`;

  const snippet7 = `
func (s *Server) Handle(request events.APIGatewayProxyRequest (events.APIGatewayProxyResponse, error) {
  switch request.HTTPMethod {
  case http.MethodGet:
    return s.HandleGraphQL(request)
  case http.MethodPost:
    return s.HandleGraphQL(request)
  case http.MethodOptions:
    return s.HandleOptions(request)
  default:
    return events.APIGatewayProxyResponse{
      StatusCode: http.StatusMethodNotAllowed,
      Headers:    AccessControl,
    }, nil
  }
}
`;

  const snippet8 = `
func (s *Server) HandleGraphQL(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
  var apollo map[string]interface{}
  if err := json.Unmarshal([]byte(request.Body), &apollo); err != nil {
    return events.APIGatewayProxyResponse{
      StatusCode: http.StatusBadRequest,
      Headers:    AccessControl,
    }, nil
  }

  query := apollo["query"]
  variables := apollo["variables"]
  result := graphql.Do(graphql.Params{
    Schema:         s.schema,
    RequestString:  query.(string),
    VariableValues: variables.(map[string]interface{}),
  })
  b, err := json.Marshal(result)
  if err != nil {
    return events.APIGatewayProxyResponse{
      StatusCode: http.StatusInternalServerError,
      Headers:    AccessControl,
    }, nil
  }

  return events.APIGatewayProxyResponse{
    StatusCode: http.StatusOK,
    Headers:    AccessControl,
    Body:       string(b),
  }, nil
}
`;

  const snippet9 = `
queryType := graphql.NewObject(
  graphql.ObjectConfig{
    Name: "Query",
    Fields: graphql.Fields{
      "post": &graphql.Field{
        Type: postType,
        Args: graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type: graphql.String,
          },
        },
        Resolve: func(p graphql.ResolveParams) (interface{}, error) {
          idQuery, isOK := p.Args["id"].(string)
          if isOK {
            s, err := strconv.ParseUint(idQuery, 10, 64)
            if err != nil {
              return nil, err
            }
            return db.GetPost(s)
          } else {
            return nil, ErrNotFound
          }
        },
      },
      "posts": &graphql.Field{
        Type: graphql.NewList(postType),
        Resolve: func(p graphql.ResolveParams) (interface{}, error) {
          return db.Posts()
        },
      },
    },
  },
)
`;

  return (
    <>
      <h1>GraphQL API in Golang with AWS Lambda</h1>
      <h6>October 23, 2020</h6>
      <p>
        Currently andrewdunstall.com is hosted with WordPress and deployed to AWS Lightsail. Given the restrictions of this approach I am rebuilding the site with a React front-end and Golang back-end API to fetch the articles. Another option was using a Headless CMS, though to avoid getting tied to another 3rd party and allow future extensions I’m building a custom API.
      </p>
      <p>
        This article describes building this API using GraphQL, with a Golang back-end (hosted on AWS Lambda) and React front-end.
      </p>

      <h2>GraphQL</h2>
      <p>
        GraphQL is a query language for APIs. This enables declarative data fetching. The client specifies exactly what data it needs and requests this from a single endpoint, rather than multiple endpoints returning fixed structure as done with REST.
      </p>
      <p>
        This minimizes the amount of data transferred as the client never receives data it doesn’t need and avoids multiple API calls to get the data it does need, which is especially important for mobile users.
      </p>
      <p>
        The back-end architecture is also much simpler as theres no longer a need to configure and serve multiple endpoints with different Lambdas, now all APIs are served with a single /graphql endpoint.
      </p>
      <p>
        I won’t describe GraphQL much here as there’s many good resources such as the
        {' '}
        <a href="https://graphql.org/learn/" target="_blank" rel="noopener noreferrer">GraphQL docs</a>
        {' '}
        and
        {' '}
        <a href="https://www.howtographql.com/" target="_blank" rel="noopener noreferrer">How To GraphQL</a>
      </p>

      <h2>API</h2>
      <p>
        The articles API only needs two queries.
      </p>
      <p>
        The first requests a list of all posts and their metadata, which is displayed in the main blog page and used to create routes to each post (using the URL path from the post response):
      </p>
      <pre>
        {snippet1}
      </pre>
      <p>
        Then to fetch the full post queried by post ID ($id):
      </p>
      <pre>
        {snippet2}
      </pre>
      <p>
        This API can be extended later to support posting new articles using mutations, though this will require access control on the server so for now posts can be posted to DynamoDB directly with the AWS CLI.
      </p>

      <h2>Client</h2>
      <p>
        The client uses React and
        {' '}
        <a href="https://www.apollographql.com/docs/react/" target="_blank" rel="noopener noreferrer">Apollo</a>
        {' '}
        . All GraphQL queries are made using the useQuery hook which returns either the response data, loading or an error.
      </p>
      <p>
        The main blog page requires routes to each post using React Router:
      </p>
      <pre>
        {snippet3}
      </pre>
      <p>
        This can also display links to each post along with the posts header and title:
      </p>
      <pre>
        {snippet4}
      </pre>
      <p>
        Below is the post component which queries the post with the given ID property and displays either a loading spinner, error notification or the full post.
      </p>
      <pre>
        {snippet5}
      </pre>

      <h2>Server</h2>
      <p>
        The API is built with a single Golang Lambda deployed with AWS SAM. The serverless application also includes a DynamoDB table to store all posts (the entry limit is 400KB which is plenty).
      </p>
      <p>
        This uses a Golang implementation of GraphQL (
        <a href="https://github.com/graphql-go/graphql" target="_blank" rel="noopener noreferrer">graphql-go</a>
        ) to serve queries.
      </p>
      <p>
        API Gateway allows all methods to the Lambda at /graphql. This keeps the handling of different methods in the Go code making it easier to work with:
      </p>
      <pre>
        {snippet6}
      </pre>
      <p>
        The server is built around a core server struct that includes a schema member. This is constructed on init() and with NewServer(schema Schema). Schema takes a database interface as an argument which makes testing easier (by either mocking the database for unit testing or using an in memory database when running the Lambda locally).
      </p>
      <p>
        To keep all routing logic in the Go rather the main handler routes to others based on the method, or returns a 405 (Method Not Allowed):
      </p>
      <pre>
        {snippet7}
      </pre>
      <p>
        The actual query handling is in the HandleGraphQL handler. This first decodes the Apollo request, passes this to GraphQL and encodes the response.
      </p>
      <pre>
        {snippet8}
      </pre>
      <p>
        Queries to the schema are resolved by looking up the resource in the database:
      </p>
      <pre>
        {snippet9}
      </pre>
      <p>
        Using GraphQL does add its own complexity over REST. Such as the above schema handling requires 3rd party libraries and more configuration than REST would have been. Though the client code is much simpler as the alternative would be using fetch, adding custom hooks, parsing the response etc.
      </p>
      <p>
        I expect the main benifits will come from faster future development, such as being able to update the client to requests different fields with minimal or no changes to the server.
      </p>
    </>
  );
}

export default GraphQLAPI;
