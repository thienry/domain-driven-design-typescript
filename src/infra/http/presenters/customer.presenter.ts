import { toXML } from 'jstoxml'

import { OutputListCustomerDto } from '../../../usecase/customer/list/list.customer.dto'

export class CustomerPresenter {
  static toXML(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: ' ',
      newline: '\n',
      allowEmpty: true,
    }

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              city: customer.address.city,
              number: customer.address.number,
              street: customer.address.street,
              zipcode: customer.address.zipcode,
            },
          })),
        },
      },
      xmlOptions
    )
  }
}
