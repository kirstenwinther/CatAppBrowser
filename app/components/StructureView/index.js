/**
 *
 * StructureView2
 *
 */

import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import GeometryCanvas from 'components/GeometryCanvas';

const cifdata = `data_global
_cell_length_a 24
_cell_length_b 5.91
_cell_length_c 5.85
_cell_angle_alpha 90
_cell_angle_beta 90
_cell_angle_gamma 90
_symmetry_space_group_name_H-M 'P1'
loop_
_symmetry_equiv_pos_as_xyz
x,y,z
loop_
_atom_site_label
_atom_site_type_symbol
_atom_site_fract_x
_atom_site_fract_y
_atom_site_fract_z
O1 O 0.425 0.262 0.009
O2 O -0.425 0.262 0.009
H3 H 0.444 0.258 0.154
H4 H -0.444 0.258 0.154
H5 H 0.396 0.124 0.012
H6 H -0.396 0.124 0.012
O7 O 0.425 0.236 0.510
O8 O -0.425 0.236 0.510
H9 H 0.444 0.239 0.656
H10 H -0.444 0.239 0.656
H11 H 0.396 0.374 0.512
H12 H -0.396 0.374 0.512
Sr13 Sr 0.342 0.964 0.467
Sr14 Sr -0.342 0.964 0.467
Sr15 Sr 0.342 0.535 0.967
Sr16 Sr -0.342 0.535 0.967
O17 O 0.348 0.971 0.019
O18 O -0.348 0.971 0.019
O19 O 0.348 0.528 0.519
O20 O -0.348 0.528 0.519
O21 O 0.263 0.803 0.701
O22 O -0.263 0.803 0.701
O23 O 0.264 0.695 0.200
O24 O -0.264 0.695 0.200
Zr25 Zr 0.261 0.000 0.998
Zr26 Zr -0.261 0.000 0.998
Zr27 Zr 0.261 0.499 0.498
Zr28 Zr -0.261 0.499 0.498
O29 O 0.257 0.304 0.806
O30 O -0.257 0.304 0.806
O31 O 0.257 0.195 0.306
O32 O -0.257 0.195 0.306
Sr33 Sr 0.173 0.993 0.524
Sr34 Sr -0.173 0.993 0.524
Sr35 Sr 0.173 0.506 0.024
Sr36 Sr -0.173 0.506 0.024
O37 O 0.173 0.947 0.986
O38 O -0.173 0.947 0.986
O39 O 0.173 0.551 0.486
O40 O -0.173 0.551 0.486
O41 O 0.098 0.204 0.295
O42 O -0.098 0.204 0.295
O43 O 0.098 0.295 0.795
O44 O -0.098 0.295 0.795
Zr45 Zr 0.086 0.004 0.998
Zr46 Zr -0.086 0.004 0.998
Zr47 Zr 0.086 0.495 0.498
Zr48 Zr -0.086 0.495 0.498
O49 O 0.074 0.709 0.211
O50 O -0.074 0.709 0.211
O51 O 0.074 0.790 0.711
O52 O -0.074 0.790 0.711
Sr53 Sr 0 0.991 0.467
Sr54 Sr 0 0.508 0.967
O55 O 0 0.076 0.020
O56 O 0 0.423 0.520`;

window.parent.cifdata = cifdata;

class StructureView2 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h2>Detailed Structure View</h2>
        <Tabs
          tabItemContainerStyle={{ width: '900px' }}
        >
          <Tab label="Structure One">
            <h2>Structure 1</h2>
            <GeometryCanvas id="structure1" cifdata={cifdata} />
          </Tab>
          <Tab label="Structure Two">
            <h2>Structure 2</h2>
            <GeometryCanvas id="structure2" cifdata={cifdata} />
          </Tab>
          <Tab label="Structure Three">
            <h2>Structure 3</h2>
            <GeometryCanvas id="structure3" cifdata={cifdata} />
          </Tab>
          <Tab label="Structure Four">
            <h2>Structure 4</h2>
            <GeometryCanvas id="structure4" cifdata={cifdata} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

StructureView2.propTypes = {

};

export default StructureView2;
