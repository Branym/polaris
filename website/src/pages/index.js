import React from 'react'

export async function getServerSideProps(context) {
  
      return {
        redirect: {
          destination: '/IND',
          permanent: false,
        },
      }
}

export default function index() {
  return (
    <div>index</div>
  )
}
