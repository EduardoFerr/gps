// import React, { useState, useEffect } from 'react';
import axios from 'axios'

const cep = axios.create({
    baseURL: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/`
})
export default cep

