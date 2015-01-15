accessing
jsonWithIdFor: aMapless

	^ JsonObject new 
		at: aMapless class idAttribute put: aMapless id;
		yourself