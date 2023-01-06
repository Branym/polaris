import * as React from 'react'
import Variant  from './Variant'

export const data = [
  {
    price: '$320',
    category: 'Aprons',
    id: 'w38t8edjvgcx634',
    product: {
      image:
        'https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fGd1eSUyMGZhY2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      name: 'Lab Coat',
      product_type: 'Garment',
    },
  },
]

export const columns = [
  {
    Header: 'Product',
    accessor: 'product',
    Cell: function ProductCell(data: any) {
      return <Variant image={data?.media[0]} name={data?.name} />
    },
  }
]
