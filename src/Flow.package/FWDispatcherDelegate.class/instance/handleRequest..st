actions
handleRequest: aRequest

	| reaction |

	reaction := self handlerFor: aRequest.

	reaction ifNil:[^ZnResponse notFound: aRequest uri].	

	^ reaction 
		value: aRequest 
		value: (ZnResponse new
				statusLine: (ZnStatusLine ok);
				headers: ZnHeaders defaultResponseHeaders;
				yourself)
