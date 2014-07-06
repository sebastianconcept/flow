actions
fileFrom: aRequest

	^ self path / aRequest uri segments last
	