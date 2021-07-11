
export default function CutWord({ name}) {

   if (name?.length >13) {

    return `${name.substr(0, (16 - 3))} ...`

  } else {

    return `${name.padEnd(16, '⠀')}`
  }
}








