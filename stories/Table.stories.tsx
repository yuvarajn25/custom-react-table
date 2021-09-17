import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Table, Props } from '../src/Table';
import { fetchData } from '../src/utils/fetchData';

const meta: Meta = {
  title: 'Data Grid',
  component: Table,
  //👇 Creates specific argTypes
  argTypes: {
    columns: {
      table: {
        disable: true,
      },
    },
    data: {
      table: {
        disable: true,
      },
    },
    useServerData: {
      table: {
        disable: true,
      },
    },
    dataFunction: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Ip Address',
    accessor: 'ip_address',
  },
];

const data2 = [
  {
    id: 121,
    first_name: 'Blair',
    last_name: 'MacConnal',
    email: 'bmacconnal3c@dagondesign.com',
    gender: 'Bigender',
    ip_address: '181.191.115.239',
  },
  {
    id: 122,
    first_name: 'Jorry',
    last_name: 'Bamblett',
    email: 'jbamblett3d@house.gov',
    gender: 'Genderqueer',
    ip_address: '146.103.182.250',
  },
  {
    id: 123,
    first_name: 'Quinn',
    last_name: "O'Neill",
    email: 'qoneill3e@walmart.com',
    gender: 'Polygender',
    ip_address: '32.17.29.117',
  },
  {
    id: 124,
    first_name: 'Zelig',
    last_name: 'Nowland',
    email: 'znowland3f@senate.gov',
    gender: 'Male',
    ip_address: '37.171.183.240',
  },
  {
    id: 125,
    first_name: 'Letta',
    last_name: 'Quaife',
    email: 'lquaife3g@nationalgeographic.com',
    gender: 'Female',
    ip_address: '251.181.150.199',
  },
  {
    id: 126,
    first_name: 'Cara',
    last_name: 'Inman',
    email: 'cinman3h@privacy.gov.au',
    gender: 'Bigender',
    ip_address: '76.248.108.190',
  },
  {
    id: 127,
    first_name: 'Adlai',
    last_name: 'Kiffe',
    email: 'akiffe3i@mapy.cz',
    gender: 'Agender',
    ip_address: '239.198.244.161',
  },
  {
    id: 128,
    first_name: 'Pedro',
    last_name: 'Meckiff',
    email: 'pmeckiff3j@elpais.com',
    gender: 'Female',
    ip_address: '19.51.194.85',
  },
  {
    id: 129,
    first_name: 'Sibby',
    last_name: 'Adamoli',
    email: 'sadamoli3k@scientificamerican.com',
    gender: 'Bigender',
    ip_address: '245.197.245.85',
  },
  {
    id: 130,
    first_name: 'Malvin',
    last_name: 'Beynkn',
    email: 'mbeynkn3l@flavors.me',
    gender: 'Agender',
    ip_address: '19.111.236.212',
  },
  {
    id: 131,
    first_name: 'Tabby',
    last_name: 'Benza',
    email: 'tbenza3m@sohu.com',
    gender: 'Polygender',
    ip_address: '22.47.134.218',
  },
  {
    id: 132,
    first_name: 'Rutledge',
    last_name: 'Melsome',
    email: 'rmelsome3n@google.co.uk',
    gender: 'Polygender',
    ip_address: '174.133.5.39',
  },
  {
    id: 133,
    first_name: 'Misha',
    last_name: 'Shapter',
    email: 'mshapter3o@macromedia.com',
    gender: 'Polygender',
    ip_address: '224.4.175.2',
  },
  {
    id: 134,
    first_name: 'Roderigo',
    last_name: 'Maseyk',
    email: 'rmaseyk3p@archive.org',
    gender: 'Genderqueer',
    ip_address: '251.197.236.87',
  },
  {
    id: 135,
    first_name: 'Louisette',
    last_name: 'Terrazzo',
    email: 'lterrazzo3q@cafepress.com',
    gender: 'Bigender',
    ip_address: '46.153.226.91',
  },
  {
    id: 136,
    first_name: 'Timothy',
    last_name: 'Lockitt',
    email: 'tlockitt3r@paypal.com',
    gender: 'Male',
    ip_address: '195.185.255.127',
  },
  {
    id: 137,
    first_name: 'Stella',
    last_name: 'Danelut',
    email: 'sdanelut3s@ycombinator.com',
    gender: 'Male',
    ip_address: '188.14.32.136',
  },
  {
    id: 138,
    first_name: 'Lexis',
    last_name: 'Penvarne',
    email: 'lpenvarne3t@apache.org',
    gender: 'Agender',
    ip_address: '245.243.190.198',
  },
  {
    id: 139,
    first_name: 'Leif',
    last_name: 'Arp',
    email: 'larp3u@statcounter.com',
    gender: 'Male',
    ip_address: '19.104.198.12',
  },
  {
    id: 140,
    first_name: 'Katti',
    last_name: 'Hancill',
    email: 'khancill3v@people.com.cn',
    gender: 'Genderqueer',
    ip_address: '205.102.16.249',
  },
];

const ServerDataTemplate: Story<Props> = (args) => {
  // We'll start our table without any data
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const getData = React.useCallback(async ({ pageSize, pageIndex, sortBy }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      // Set the loading state

      const tData = await fetchData(pageIndex + 1, pageSize, sortBy);
      setRows(tData);

      console.log(`data2`, rows, loading, pageCount);
      setPageCount(10);
    }
  }, []);

  return (
    <Table
      columns={columns}
      data={rows}
      dataFunction={getData}
      useServerData={true}
      {...args}
    />
  );
};

const LocalDataTemplate: Story<Props> = (args) => {
  return <Table columns={columns} data={data2} {...args} />;
};

export const ServerDataTable = ServerDataTemplate.bind({});
export const LocalDataTable = LocalDataTemplate.bind({});

ServerDataTable.args = {
  enableSorting: true,
  enableColumnResize: true,
  enableRowSelect: false,
  enabledPagination: true,
  totalRecordsCount: 500,
  pageSizes: [25, 50, 100],
};

LocalDataTable.args = {
  enableSorting: true,
  enableColumnResize: true,
  enableRowSelect: false,
  enabledPagination: true,
  pageSizes: [10, 20, 30],
};
