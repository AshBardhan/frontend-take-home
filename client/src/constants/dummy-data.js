export const SampleTestnetListData = [
	{
		name: 'powder-determine',
		id: '23445f43-f4fe-475f-8ac7-1d23752fa075',
		status: 'RUNNING',
		endpoint: '65.0.129.63',
		created_at: '2022-10-27T09:03:41.5306+00:00',
		updated_at: '2022-10-27T09:06:10.622644+00:00',
		testnet_off_chain_actors: [
			{
				name: 'routerCache',
				status: 'RUNNING',
				__typename: 'testnet_off_chain_actor',
			},
			{
				name: 'ipfs',
				status: 'RUNNING',
				__typename: 'testnet_off_chain_actor',
			},
			{
				name: 'sequencerCache',
				status: 'RUNNING',
				__typename: 'testnet_off_chain_actor',
			},
		],
		testnet_chains: [
			{
				chain: 'ethereum',
				status: 'RUNNING',
				__typename: 'testnet_chain',
			},
		],
		testnet_image: {
			project_id: '763db951-01d2-455e-8c45-08b839f2248b',
			id: 'e85d297e-b911-41d7-a47e-9a469b49d6c1',
			__typename: 'testnet_image',
		},
		__typename: 'testnet',
	},
	{
		name: 'did-steep',
		id: 'f7c02e26-e1d1-4a34-b24b-29eeb739fb3e',
		status: 'RUNNING',
		endpoint: '65.2.166.42',
		created_at: '2022-10-27T09:03:20.660574+00:00',
		updated_at: '2022-10-27T09:05:43.629523+00:00',
		testnet_off_chain_actors: [
			{
				name: 'routerCache',
				status: 'RUNNING',
				__typename: 'testnet_off_chain_actor',
			},
			{
				name: 'ipfs',
				status: 'RUNNING',
				__typename: 'testnet_off_chain_actor',
			},
			{
				name: 'sequencerCache',
				status: 'RUNNING',
				__typename: 'testnet_off_chain_actor',
			},
		],
		testnet_chains: [
			{
				chain: 'ethereum',
				status: 'RUNNING',
				__typename: 'testnet_chain',
			},
		],
		testnet_image: {
			project_id: '763db951-01d2-455e-8c45-08b839f2248b',
			id: '9172448c-7f8a-45fe-abea-05141259a779',
			__typename: 'testnet_image',
		},
		__typename: 'testnet',
	},
];

export const SampleTestnetData = {
	name: 'testing clone',
	id: '23555f67-a4de-453f-8eb7-1d23992cd075',
	status: 'RUNNING',
	endpoint: '15.101.17.213',
	created_at: '2023-10-27T09:13:51.5306+00:00',
	updated_at: '2023-10-27T09:26:40.622644+00:00',
	testnet_off_chain_actors: [
		{
			name: 'routerCache',
			status: 'UPDATING',
			__typename: 'testnet_off_chain_actor',
		},
		{
			name: 'ipfs',
			status: 'STOPPED',
			__typename: 'testnet_off_chain_actor',
		},
	],
	testnet_chains: [
		{
			chain: 'ethereum',
			status: 'UPDATING',
			__typename: 'testnet_chain',
		},
		{
			chain: 'bitcoin',
			status: 'UPDATING',
			__typename: 'testnet_chain',
		},
	],
	testnet_image: {
		project_id: '763ee978-0e32-466d-d345-00a835ed2499',
		id: 'ed297e85-9b11-1d47-7a4e-946ba49d96c1',
		__typename: 'testnet_image',
	},
	__typename: 'testnet',
};
