<template>
  <SectionHeading label="Tarifs"/>
  <p class="mb-5">
    Les tarifs sont les suivants :
  </p>
  <table class="w-full text-left border-collapse border border-gray-300">
    <thead class="bg-gray-100">
    <tr>
      <th class="p-2">Type</th>
      <th class="p-2">Prix</th>
    </tr>
    </thead>
    <tbody>
    <tr class="border-b">
      <td class="p-2">Tarif normal</td>
      <td class="p-2">6€</td>
    </tr>
    <tr class="border-b">
      <td class="p-2">Tarif abonné *</td>
      <td class="p-2">4,50€</td>
    </tr>
    <tr class="border-b">
      <td class="p-2">Carte 10 entrées (rechargeable)</td>
      <td class="p-2">55€ + 1€ pour la carte au premier achat</td>
    </tr>
    <tr class="border-b">
      <td class="p-2">Tarif réduit (étudiants, demandeurs d'emploi, etc.)</td>
      <td class="p-2">4€</td>
    </tr>
    <tr class="border-b">
      <td class="p-2">Tarif enfant (jusqu'à 13 ans)</td>
      <td class="p-2">3.00€</td>
    </tr>
    <tr class="border-b">
      <td class="p-2">Séance en 3D (supplément)</td>
      <td class="p-2">1€</td>
    </tr>
    </tbody>
  </table>
  <p class="mt-5">
    * La carte "abonné" est vendue 8 euros (+ 1 euro au premier achat), et donne accès au tarif de 4,50 euros pour toutes les séances.
    Elle est valable 1 an à partir de la date d'achat.
  </p>
  <p class="my-5">
    Le cinéma accepte la carte PASS Région pour les Lycéens de la Région Rhône-Alpes.
  </p>
  <p>
    Pour plus d'informations, veuillez nous contacter.
  </p>
</template>
<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue';
</script>