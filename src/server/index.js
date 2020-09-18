import React from 'react';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from "styled-components";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from "@apollo/client/react/ssr";
import fetch from 'node-fetch';
import App from '../components/App';
import { GRAPHQL_URI } from '../config';
import template from './template';

const server = express();
const sheet = new ServerStyleSheet();
const context = {};
const DEBUG = true;

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const link = createHttpLink({
      uri: GRAPHQL_URI,
      fetch: (...pl) => {
        if (!DEBUG) return fetch(...pl)
        const [_, options] = pl
        const body = JSON.parse(options.body)
        console.log(`📡${body.operationName || ''}\n${body.query}`, body.variables)
        return fetch(...pl)
      }
    });
    const cache = new InMemoryCache();
    const client = new ApolloClient({
      link,
      cache,
      ssrMode: true,
      credentials: 'same-origin',
    });
    const AppSr = (
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    if (context.url) {
      return res.redirect(context.url);
    }
    await getDataFromTree(AppSr);
    const content = renderToString(sheet.collectStyles(AppSr));
    const styleSheet = sheet.getStyleTags();
    const initialState = client.extract();
    return res
      .status(200)
      .send(template({ content, styleSheet, initialState }))
      .end();
  });

export default server;
