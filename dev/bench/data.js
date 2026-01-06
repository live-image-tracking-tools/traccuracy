window.BENCHMARK_DATA = {
  "lastUpdate": 1767714786901,
  "repoUrl": "https://github.com/live-image-tracking-tools/traccuracy",
  "entries": {
    "Python Benchmark with pytest-benchmark": [
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9ef5c0a60bafa01ba2416fb2f6d435ad1d261a59",
          "message": "Merge pull request #62 from Janelia-Trackathon-2023/benchmark\n\nAdd basic set of performance benchmarking tests",
          "timestamp": "2023-10-11T11:56:33-07:00",
          "tree_id": "2311bcf0ded752234b676f6de32d13a15cd48cba",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/9ef5c0a60bafa01ba2416fb2f6d435ad1d261a59"
        },
        "date": 1697050935159,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.44346198594964636,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.254984715000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.548544191089205,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8230071819999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.19312251187582147,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.178060239000018 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 0.006074829897877951,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 164.613662738 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 1.8927470976959035,
            "unit": "iter/sec",
            "range": "stddev: 0.03963486880011249",
            "extra": "mean: 528.3326025000008 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.05521454487306353,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.111169843000027 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.0658128062334917,
            "unit": "iter/sec",
            "range": "stddev: 0.023188769655713343",
            "extra": "mean: 484.0709656666604 msec\nrounds: 3"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "msschwartz21",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "msschwartz21@gmail.com",
            "name": "msschwartz21",
            "username": "msschwartz21"
          },
          "distinct": true,
          "id": "82fc051ffc64459be1726cee9a0521199055a804",
          "message": "Add badge for the benchmarking to readme",
          "timestamp": "2023-10-11T16:02:08-07:00",
          "tree_id": "e052c6461425521997feaf7b0880ac879a28d4bd",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/82fc051ffc64459be1726cee9a0521199055a804"
        },
        "date": 1697065732209,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.4682392034864301,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.135660560999952 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.589285282634235,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6969709400000283 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.14554139329580645,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.870897532000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 0.004767014111030251,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 209.77491920700004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 1.783591940297145,
            "unit": "iter/sec",
            "range": "stddev: 0.06218887397209215",
            "extra": "mean: 560.6663595000327 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.05196118345686752,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.24513518499998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 1.8105263547824975,
            "unit": "iter/sec",
            "range": "stddev: 0.06094721567754861",
            "extra": "mean: 552.3255694999989 msec\nrounds: 2"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ecbf250220c1677e9218a0300ac9e53c67c3e139",
          "message": "Improve the benchmarking workflow to generate a commit comment on PRs (#64)\n\n* Update benchmark ci workflow to generate a report\r\n\r\n* Improve report output\r\n\r\n* Add ID for cache step\r\n\r\n* Add missing dependency\r\n\r\n* Beautify benchmark commit table\r\n\r\n---------\r\n\r\nCo-authored-by: Benjamin Gallusser <bgallusser@googlemail.com>",
          "timestamp": "2023-10-12T20:24:11+02:00",
          "tree_id": "03860a2b20ca9afce54252fcb9db2fcc7a2a14f9",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ecbf250220c1677e9218a0300ac9e53c67c3e139"
        },
        "date": 1697135376358,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.5908492832915347,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.692478992999952 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.7175831801935637,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3935666659999697 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.17585046249238723,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.68664981500001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 0.006303631764377542,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 158.638708189 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 2.0421670512436205,
            "unit": "iter/sec",
            "range": "stddev: 0.058956596951455574",
            "extra": "mean: 489.6759055000075 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.06134712568614267,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.30068220499993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.0703462990096737,
            "unit": "iter/sec",
            "range": "stddev: 0.05067068999095769",
            "extra": "mean: 483.0109825000477 msec\nrounds: 2"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "bgallusser@googlemail.com",
            "name": "Benjamin Gallusser",
            "username": "bentaculum"
          },
          "committer": {
            "email": "bgallusser@googlemail.com",
            "name": "Benjamin Gallusser",
            "username": "bentaculum"
          },
          "distinct": true,
          "id": "215336c1c5fda809da7cff17ed4e7ea2d4bb48b8",
          "message": "Update benchmark commit table",
          "timestamp": "2023-10-12T11:29:15-07:00",
          "tree_id": "76df5c64a0577dfc5a8fe0de0b48746ce3fcdff5",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/215336c1c5fda809da7cff17ed4e7ea2d4bb48b8"
        },
        "date": 1697135676508,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.6056600247226528,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6510913040000048 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.7170725270279407,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3945590750000036 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.1791020067206554,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.583410361000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 0.0063472629925833786,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 157.54822215000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 2.1370823502234035,
            "unit": "iter/sec",
            "range": "stddev: 0.049816876937443015",
            "extra": "mean: 467.9276864999906 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.06149928547178184,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.260351519999972 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.0706832146586653,
            "unit": "iter/sec",
            "range": "stddev: 0.037520412671763356",
            "extra": "mean: 482.93239299997975 msec\nrounds: 3"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "73ddb1cad06d41beb25dde3c9b4cb076e3a3164a",
          "message": "Merge pull request #65 from Janelia-Trackathon-2023/log-benchmarks\n\nImprove benchmark action when running on repo forks",
          "timestamp": "2023-10-13T15:39:58-07:00",
          "tree_id": "5a0b8b83fbb209b0c1ece6220c4c17ebb686f95e",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/73ddb1cad06d41beb25dde3c9b4cb076e3a3164a"
        },
        "date": 1697237122099,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.6103223896559927,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6384783139999968 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.7240038315441172,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.38120816 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.19211030524957734,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.205342830000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 0.006042300404344065,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 165.49988135000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 2.4307685201370997,
            "unit": "iter/sec",
            "range": "stddev: 0.03190419610545715",
            "extra": "mean: 411.3925253333453 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.056208885193086144,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.79078159200003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.3483704904920573,
            "unit": "iter/sec",
            "range": "stddev: 0.03876671809174468",
            "extra": "mean: 425.8271869999817 msec\nrounds: 3"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b6b7d7ddb4500127a94eb54a9ef23c2985bbdfc8",
          "message": "Merge pull request #66 from Janelia-Trackathon-2023/benchmark-assertion-fix\n\nCorrect benchmarking tests assertion for wrong semantic edges",
          "timestamp": "2023-10-25T17:30:15-07:00",
          "tree_id": "e40f29880d49f94413b03469294cb8fa457ebcfc",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/b6b7d7ddb4500127a94eb54a9ef23c2985bbdfc8"
        },
        "date": 1698280624965,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.434106340662653,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.3035830310000165 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.5069699552641387,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.9725034779999646 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.15141368418119974,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.604422879000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 0.004643510494317815,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 215.354310327 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 1.8035937659084522,
            "unit": "iter/sec",
            "range": "stddev: 0.05663096132522826",
            "extra": "mean: 554.4485786666655 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.048052839490470525,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.810424744999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 1.747503178380709,
            "unit": "iter/sec",
            "range": "stddev: 0.006932425385260891",
            "extra": "mean: 572.2450249999724 msec\nrounds: 2"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "082e010499343bda10ccd62625596a51e86a8e7c",
          "message": "Merge pull request #52 from Janelia-Trackathon-2023/dependabot/github_actions/actions/checkout-4\n\nci(dependabot): bump actions/checkout from 3 to 4",
          "timestamp": "2023-10-26T10:49:34-04:00",
          "tree_id": "aa2d9396cff6d9fb01ae9766286668048a9862fe",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/082e010499343bda10ccd62625596a51e86a8e7c"
        },
        "date": 1698332093729,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.5981115434270673,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6719289419999939 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.7369577004917652,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3569299829999864 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.18013652965859855,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.551344870999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 0.006330954119484748,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 157.954074714 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 2.014511310629822,
            "unit": "iter/sec",
            "range": "stddev: 0.02196302051954228",
            "extra": "mean: 496.3983050000138 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.060786984540631854,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.450890063999964 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.15764129950012,
            "unit": "iter/sec",
            "range": "stddev: 0.035987610386586835",
            "extra": "mean: 463.46906700000545 msec\nrounds: 3"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "674c0f8be3daac91f04403bd777d4a82de4ecef5",
          "message": "Merge pull request #63 from Janelia-Trackathon-2023/access_by_attr\n\nSpeed up accessing nodes/edges by attribute and node/edge attributes",
          "timestamp": "2023-10-27T15:38:30-04:00",
          "tree_id": "e7b827851c2a1f5a80f15a164156fd41660ea8a4",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/674c0f8be3daac91f04403bd777d4a82de4ecef5"
        },
        "date": 1698435836563,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.5675779168906919,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7618726349999747 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.7004545973451776,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4276442809999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.29925624173399434,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.3416178530000025 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 0.006002913919971993,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 166.585763736 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 1.9167146590720576,
            "unit": "iter/sec",
            "range": "stddev: 0.02186697105477821",
            "extra": "mean: 521.7260666666638 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.05414291829613084,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.469636131000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 1.9397951426383637,
            "unit": "iter/sec",
            "range": "stddev: 0.0016259474956348136",
            "extra": "mean: 515.5183544999886 msec\nrounds: 2"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ed2b7b111346cf8deef0e03bb7d68754cfd3fa84",
          "message": "Merge pull request #59 from bentaculum/faster_edge_errors\n\nSpeed up CTC edge errors",
          "timestamp": "2023-10-30T10:14:34-04:00",
          "tree_id": "8ea5f46158d6cfffd4e6a52ad69a56ee976f7be2",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ed2b7b111346cf8deef0e03bb7d68754cfd3fa84"
        },
        "date": 1698675430056,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.6015459334672951,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6623834429999818 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.7482267779201673,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3364931990000173 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.3146030965320702,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.1786082559999898 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.394085526631285,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 717.3161049999806 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 2.4797900274495293,
            "unit": "iter/sec",
            "range": "stddev: 0.03000291276134732",
            "extra": "mean: 403.2599489999977 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.0562552099714961,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.776131322000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.4745657757559867,
            "unit": "iter/sec",
            "range": "stddev: 0.032005095595547255",
            "extra": "mean: 404.11130300001713 msec\nrounds: 3"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ed2b7b111346cf8deef0e03bb7d68754cfd3fa84",
          "message": "Merge pull request #59 from bentaculum/faster_edge_errors\n\nSpeed up CTC edge errors",
          "timestamp": "2023-10-30T10:14:34-04:00",
          "tree_id": "8ea5f46158d6cfffd4e6a52ad69a56ee976f7be2",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ed2b7b111346cf8deef0e03bb7d68754cfd3fa84"
        },
        "date": 1698690262813,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.4388150216862543,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.27886455700002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.5370584895997171,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8619945859999802 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.2849398661325083,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.509512423000018 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.1219872327299945,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 891.2757390000081 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 1.9930738868734224,
            "unit": "iter/sec",
            "range": "stddev: 0.07131322148458548",
            "extra": "mean: 501.73754549999217 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.047679493896834735,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.973376985999977 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 1.900133877162481,
            "unit": "iter/sec",
            "range": "stddev: 0.0630087197371194",
            "extra": "mean: 526.2787070000172 msec\nrounds: 2"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d3560d1a251d5fa2aa46ef99b07c2733f9151a9d",
          "message": "Merge pull request #69 from tlambert03/cov\n\ntest: enable codecov",
          "timestamp": "2023-11-01T15:23:06-04:00",
          "tree_id": "2547e4699635c504ed684367113a700d3f32bc0d",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/d3560d1a251d5fa2aa46ef99b07c2733f9151a9d"
        },
        "date": 1698866737370,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.5817122836141703,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7190628910000214 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.6992891928149043,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4300235299999713 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.2906603238910333,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.440442047999966 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.1352615489632343,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 880.8542849999981 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 2.091135562696463,
            "unit": "iter/sec",
            "range": "stddev: 0.05383950983483694",
            "extra": "mean: 478.2090735000111 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.06058757202938583,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.505035050999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.119178147832734,
            "unit": "iter/sec",
            "range": "stddev: 0.04463988939126471",
            "extra": "mean: 471.8810454999698 msec\nrounds: 2"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "32581bf8b6ecaf9ed61d7f94eb90622c8cc4cdd8",
          "message": "Merge pull request #70 from tlambert03/linting\n\nstyle: update pre-commit",
          "timestamp": "2023-11-01T22:13:49-04:00",
          "tree_id": "7313cc9fa794334c62749a0ae190e91bf92d4358",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/32581bf8b6ecaf9ed61d7f94eb90622c8cc4cdd8"
        },
        "date": 1698891329133,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7791582996298192,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2834362419999934 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8507003809005014,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1755020009999981 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4838820327192064,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.066619407999994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8879091404004662,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 529.6865079999975 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.5110323632585883,
            "unit": "iter/sec",
            "range": "stddev: 0.018299419715445693",
            "extra": "mean: 284.8165144999974 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.13203105730490117,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.5739755509999895 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.5248450998009466,
            "unit": "iter/sec",
            "range": "stddev: 0.023647561247827863",
            "extra": "mean: 283.70040999999446 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5ff8bcf95e222d389e2eef56e4ebb480d171aba1",
          "message": "Merge pull request #71 from tlambert03/docs\n\ndocs: fix docs build, fix all build warnings, enable strict mode",
          "timestamp": "2023-11-01T22:27:08-04:00",
          "tree_id": "db5da5b332c59008dace80f55f3aedad2891e05f",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/5ff8bcf95e222d389e2eef56e4ebb480d171aba1"
        },
        "date": 1698892180051,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.5585960793565623,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7902023249999957 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.6987681177873055,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4310899059999542 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.29013097541614724,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.4467191880000314 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.1484041738850705,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 870.7735680000042 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 2.102879271972475,
            "unit": "iter/sec",
            "range": "stddev: 0.05924214151887511",
            "extra": "mean: 475.5384739999897 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.060844138287457335,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.43543697299998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.0885093978512943,
            "unit": "iter/sec",
            "range": "stddev: 0.04654495322910609",
            "extra": "mean: 478.810390333327 msec\nrounds: 3"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "27da5a762328bd383d3242469794351b3aa1fb17",
          "message": "Merge pull request #68 from Janelia-Trackathon-2023/dependabot/github_actions/actions/checkout-4\n\nci(dependabot): bump actions/checkout from 3 to 4",
          "timestamp": "2023-11-02T12:56:07-04:00",
          "tree_id": "ba5430c715d0265ac28f89b47c456c65efcf0d76",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/27da5a762328bd383d3242469794351b3aa1fb17"
        },
        "date": 1698944278502,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7662125096280074,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3051209519999816 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8511459577661792,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.174886622999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4692843205280406,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.1309043500000087 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8927468666252252,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 528.3326670000008 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.3528272324612853,
            "unit": "iter/sec",
            "range": "stddev: 0.029956549825187546",
            "extra": "mean: 298.25574975001246 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.12856614079115383,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.7780976690000045 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.392962514791874,
            "unit": "iter/sec",
            "range": "stddev: 0.023426230515521153",
            "extra": "mean: 294.727688750001 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "000ea54038edb7ef8cf6e1e9f57cdfa18dff989c",
          "message": "Merge pull request #112 from yfukai/track_metrics_from_laptrack\n\nAdding track overlap metrics from `laptrack`",
          "timestamp": "2023-11-13T12:07:07-08:00",
          "tree_id": "eaf572ac14ba14f847fca1dddeb85ad47aac2cee",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/000ea54038edb7ef8cf6e1e9f57cdfa18dff989c"
        },
        "date": 1699906128075,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7793177577249725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2831736349999971 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8524758119557483,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1730538109999884 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4734186933780463,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.1122951290000174 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8939036536817866,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 528.009964000006 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.5003158636906018,
            "unit": "iter/sec",
            "range": "stddev: 0.020919667195289537",
            "extra": "mean: 285.6885032500003 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11928006049911409,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.383630891999985 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.4913047392734344,
            "unit": "iter/sec",
            "range": "stddev: 0.02134483588180091",
            "extra": "mean: 286.42587075000137 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9d984f6d8a8a7ff42e190bc65777fad1693ea0cd",
          "message": "Merge pull request #103 from Janelia-Trackathon-2023/matcher\n\nRefactor existing `Matched` into separate `Matcher` which returns `Matched`",
          "timestamp": "2023-11-14T11:27:18-08:00",
          "tree_id": "2ef616eee3baecf131b1ace6aac9a677f90fbbcd",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/9d984f6d8a8a7ff42e190bc65777fad1693ea0cd"
        },
        "date": 1699990212550,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.6095398673813986,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6405817790000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.7229255289580252,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3832683449999763 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.30501353421152383,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.2785430409999776 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.1999238869079818,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 833.3861929999955 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 2.1391443263114494,
            "unit": "iter/sec",
            "range": "stddev: 0.047518338071840464",
            "extra": "mean: 467.4766390000021 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.05808276303513982,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.216811800000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 2.117246308435023,
            "unit": "iter/sec",
            "range": "stddev: 0.045581947098613754",
            "extra": "mean: 472.31160399998845 msec\nrounds: 3"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d71f1b57f61ea86e79c1fe249b261176ce20ba0b",
          "message": "Merge pull request #109 from Janelia-Trackathon-2023/metrics-baseclass\n\nRefactor `Metrics` class to pass data into compute method not constructor",
          "timestamp": "2023-11-14T14:46:38-08:00",
          "tree_id": "c2e340b471a35309bde6b1591a9611719580f481",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/d71f1b57f61ea86e79c1fe249b261176ce20ba0b"
        },
        "date": 1700002103902,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7641618678326608,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3086232670000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8518045321856508,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1739782569999875 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.44880003099269605,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.22816383899999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.941938286238188,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 514.9494230000187 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.535539706875081,
            "unit": "iter/sec",
            "range": "stddev: 0.023199262587836826",
            "extra": "mean: 282.84224839999297 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.10531088335706355,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.495694728999979 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.752543864730567,
            "unit": "iter/sec",
            "range": "stddev: 0.030176478875578228",
            "extra": "mean: 266.4858922500031 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f8f352cd7543a4ecf90651a2ae459f75ad274703",
          "message": "Merge pull request #121 from Janelia-Trackathon-2023/pr-template\n\nAdd pull request and issue templates",
          "timestamp": "2023-11-17T11:52:42-08:00",
          "tree_id": "5099adae4013cf6e1114ddec78d27644b62e663e",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/f8f352cd7543a4ecf90651a2ae459f75ad274703"
        },
        "date": 1700250883603,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7889598213910978,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2674916680000194 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8677371201362694,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1524227520000068 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4489741252377399,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.227299845999994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8927513841567607,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 528.3314060000066 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.536717055168083,
            "unit": "iter/sec",
            "range": "stddev: 0.023018396483604348",
            "extra": "mean: 282.74809220000634 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11068658473101896,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.034518523000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.713368794674698,
            "unit": "iter/sec",
            "range": "stddev: 0.030159233453140488",
            "extra": "mean: 269.29724875000005 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c9e6197c004b4fa67c3963f18a95fff4d76bdffd",
          "message": "Merge pull request #122 from Janelia-Trackathon-2023/pr-templates-link\n\nCreate general pr template",
          "timestamp": "2023-11-17T12:01:23-08:00",
          "tree_id": "e086a6af0324d50cac575171cefce800f8d32df5",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/c9e6197c004b4fa67c3963f18a95fff4d76bdffd"
        },
        "date": 1700251387193,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.778143163719271,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2851105639999787 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.851031241447111,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1750449939999612 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.44718828743219996,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2361945249999735 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.9148535330256273,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 522.2331539999914 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.569741967791678,
            "unit": "iter/sec",
            "range": "stddev: 0.023247077175447595",
            "extra": "mean: 280.132292199994 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.10504558788223974,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.51967636300003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.7507894544434506,
            "unit": "iter/sec",
            "range": "stddev: 0.029320947359145432",
            "extra": "mean: 266.6105394999789 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e5df26a63ddcd2da4ce9c9c43cfc0d0b34b77647",
          "message": "Merge pull request #123 from Janelia-Trackathon-2023/remove-headers\n\nRemove Pr template headers",
          "timestamp": "2023-11-17T12:03:07-08:00",
          "tree_id": "bd966f0ca43e26e894ed126e0bf9830bce3ed1c3",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/e5df26a63ddcd2da4ce9c9c43cfc0d0b34b77647"
        },
        "date": 1700251500981,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7720005551981073,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.29533585599998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8866273374088791,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1278695770000127 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4696847294140318,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.129087741999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 2.0303015810983114,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 492.5376650000146 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.6883980403201897,
            "unit": "iter/sec",
            "range": "stddev: 0.022275348582860795",
            "extra": "mean: 271.12041299999987 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11477190794659538,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.712933485999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.9509680401622487,
            "unit": "iter/sec",
            "range": "stddev: 0.026600280616226067",
            "extra": "mean: 253.1025282499968 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d4ee393b1dbddd3955d99e686719fa464c0a4d55",
          "message": "Merge pull request #124 from Janelia-Trackathon-2023/docs-fixes\n\nFix subclass docstrings for sphinx autoapi",
          "timestamp": "2023-11-20T11:52:33-08:00",
          "tree_id": "742ee63151fd7347343dba8b920012f2eaff1e51",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/d4ee393b1dbddd3955d99e686719fa464c0a4d55"
        },
        "date": 1700510062131,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7864971433421004,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2714604349999945 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8687202155039128,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1511186019999968 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4457788672373546,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2432647070000087 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8740503144615528,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 533.6036030000173 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.5064516455630224,
            "unit": "iter/sec",
            "range": "stddev: 0.04095443679380986",
            "extra": "mean: 285.18858979999777 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.10491661207423435,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.531379066 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6788592309583636,
            "unit": "iter/sec",
            "range": "stddev: 0.027845127822246935",
            "extra": "mean: 271.82339339999544 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "64431d80b5943b6992ddeaef7142e07b5c2ca310",
          "message": "Merge pull request #118 from Janelia-Trackathon-2023/run_metrics\n\nUpdate `run_metrics` to take instantiated `Matchers` and `Metrics` as input",
          "timestamp": "2023-11-20T13:11:27-08:00",
          "tree_id": "1a084334358cf5e5c7725763f53d178ea7f2843d",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/64431d80b5943b6992ddeaef7142e07b5c2ca310"
        },
        "date": 1700514803255,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.757697458711974,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.319787981999994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.815119163464662,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2268144889999917 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.43818240213157206,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2821546349999977 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.751141011524784,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 571.0562390000007 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.603668511192661,
            "unit": "iter/sec",
            "range": "stddev: 0.029821894083601544",
            "extra": "mean: 277.495001799997 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11006743863334285,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.085339065 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6140914939486,
            "unit": "iter/sec",
            "range": "stddev: 0.02782634119324373",
            "extra": "mean: 276.6947105999918 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2ed94df23575a8a93cc82e82adb0c2fd9315d691",
          "message": "ci(pre-commit.ci): autoupdate (#113)\n\nupdates:\r\n- [github.com/crate-ci/typos: v1.16.21 → v1.16.23](https://github.com/crate-ci/typos/compare/v1.16.21...v1.16.23)\r\n- [github.com/astral-sh/ruff-pre-commit: v0.1.3 → v0.1.4](https://github.com/astral-sh/ruff-pre-commit/compare/v0.1.3...v0.1.4)\r\n\r\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>\r\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2023-11-28T14:00:59+11:00",
          "tree_id": "86ea1c5292bd6f9a8b035093d43588e0636bc4f9",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/2ed94df23575a8a93cc82e82adb0c2fd9315d691"
        },
        "date": 1701140559706,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.76483486846922,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.307471770999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8437890924322348,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1851302759999953 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4457106910855777,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2436078380000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8614257643506527,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 537.2226060000003 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.622413629270416,
            "unit": "iter/sec",
            "range": "stddev: 0.03202086546226646",
            "extra": "mean: 276.05903200000057 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11082435035857705,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.02328772300001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6660173064875976,
            "unit": "iter/sec",
            "range": "stddev: 0.029746176415754364",
            "extra": "mean: 272.77558079999835 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ef50a446c5ee52d2581dc23a73c2e46325537d49",
          "message": "Merge pull request #104 from tlambert03/future\n\nstyle: cleanup string type annotations",
          "timestamp": "2023-11-29T14:09:25-05:00",
          "tree_id": "3807271d1f76ffb31f426ddcb1d2f2574828b20a",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ef50a446c5ee52d2581dc23a73c2e46325537d49"
        },
        "date": 1701285078036,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7678622249258596,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.302316961999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8568395922338184,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.167079589999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4477917452565962,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2331809610000164 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8744695485485496,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 533.4842600000229 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.7009250464374412,
            "unit": "iter/sec",
            "range": "stddev: 0.028335503834475313",
            "extra": "mean: 270.2027161999979 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11095609632149325,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.012573739999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6448240443477786,
            "unit": "iter/sec",
            "range": "stddev: 0.02223632011231523",
            "extra": "mean: 274.36166680000724 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a61d295fc9428d49ece133597b93d1dafb62aa03",
          "message": "Merge pull request #128 from Janelia-Trackathon-2023/pre-commit-ci-update-config\n\nci(pre-commit.ci): autoupdate",
          "timestamp": "2023-12-06T17:21:40-05:00",
          "tree_id": "2736ac22433a4b770333b2861952905317ffeadd",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/a61d295fc9428d49ece133597b93d1dafb62aa03"
        },
        "date": 1701901414559,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7266606301078821,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3761582209999972 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8528358164816634,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1725586339999836 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4439543472581501,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.252483855999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.863514265927508,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 536.6205230000105 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.67555665026375,
            "unit": "iter/sec",
            "range": "stddev: 0.030155535026090422",
            "extra": "mean: 272.0676335999997 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.1054126519428929,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.486527295999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6677385979931247,
            "unit": "iter/sec",
            "range": "stddev: 0.029693741218863617",
            "extra": "mean: 272.6475656000048 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "bgallusser@googlemail.com",
            "name": "Benjamin Gallusser",
            "username": "bentaculum"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ad3f68d2f89ac718475111b5cb08776057760f12",
          "message": "Add CTC format checks in loader (#119)\n\n* Add CTC format checks in loader\r\n\r\n- unique positive integer track IDs\r\n- indicated parent IDs present\r\n- parent tracklet ends before child tracklet starts (gaps possible)\r\n- masks contain all detections as indicated in tracks file, and vice versa.\r\n\r\n* Add complete object name for docs cross referencing\r\n\r\n* Update docstrings and error messages\r\n\r\n* Add soft connected component check for CTC data\r\n\r\n* Remove ctc checks in benchmarking\r\n\r\n* Expose helper functions in ctc loader\r\n\r\n* Add separate benchmark for ctc loader checks\r\n\r\n---------\r\n\r\nCo-authored-by: msschwartz21 <msschwartz21@gmail.com>",
          "timestamp": "2023-12-10T12:34:25+01:00",
          "tree_id": "72b3ca9e243cbe8233ee06a77fbab8b68b657308",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ad3f68d2f89ac718475111b5cb08776057760f12"
        },
        "date": 1702208170897,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.762385353948531,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3116726270000072 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8637356685825222,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1577616120000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.4750245438283627,
            "unit": "iter/sec",
            "range": "stddev: 0.0037961304042288015",
            "extra": "mean: 404.036397333338 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4426554114811742,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2590935839999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8813036641988345,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 531.5462989999844 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.5590558873373035,
            "unit": "iter/sec",
            "range": "stddev: 0.023191451229756913",
            "extra": "mean: 280.9733905999849 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11205782058934108,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.923964385000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.760784196765182,
            "unit": "iter/sec",
            "range": "stddev: 0.03187056641937951",
            "extra": "mean: 265.90198949999433 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "15a7d5f264304d69983693457c7c070858b443da",
          "message": "Merge pull request #126 from Janelia-Trackathon-2023/results-class\n\nCreate a `Results` class for storing metric output with associated metadata",
          "timestamp": "2023-12-15T10:46:35-08:00",
          "tree_id": "6e3cd964e98b8a7122000d8f4d470797b19d0194",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/15a7d5f264304d69983693457c7c070858b443da"
        },
        "date": 1702666145203,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7848303359038168,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2741607380000062 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.860803200419466,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1617057180000074 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.453893352018302,
            "unit": "iter/sec",
            "range": "stddev: 0.002004714905130895",
            "extra": "mean: 407.5156726666667 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4481806347804113,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2312432139999885 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8580259344003647,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 538.2056199999852 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.583434292115107,
            "unit": "iter/sec",
            "range": "stddev: 0.030309166295722716",
            "extra": "mean: 279.0619050000089 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.10580026618777752,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.451772061000014 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6090396991667895,
            "unit": "iter/sec",
            "range": "stddev: 0.029572792408642728",
            "extra": "mean: 277.0820171999958 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c681c3d0c80ef2e195b7d2cffac41efb294be15d",
          "message": "Merge pull request #133 from Janelia-Trackathon-2023/pre-commit-ci-update-config\n\nci(pre-commit.ci): autoupdate",
          "timestamp": "2024-01-08T11:19:49-05:00",
          "tree_id": "383a6649f77103071747f4da24790bdc25a7d2b0",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/c681c3d0c80ef2e195b7d2cffac41efb294be15d"
        },
        "date": 1704730899740,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8063553282244571,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2401480649999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8612042629831475,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1611647120000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.4619537140950274,
            "unit": "iter/sec",
            "range": "stddev: 0.0012848548824511558",
            "extra": "mean: 406.1814786666626 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.44860199804189727,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2291474499999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8651781177489695,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 536.1418250000014 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.588260934310525,
            "unit": "iter/sec",
            "range": "stddev: 0.02932647314645283",
            "extra": "mean: 278.6865332000019 msec\nrounds: 5"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.10557592509476711,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.471856383000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.5946320057563215,
            "unit": "iter/sec",
            "range": "stddev: 0.03057010024195997",
            "extra": "mean: 278.19259340000144 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6f6406ecb68e9e0fc05b788552820f8f3e6ff24f",
          "message": "Merge pull request #131 from Janelia-Trackathon-2023/dependabot/github_actions/actions/setup-python-5\n\nci(dependabot): bump actions/setup-python from 4 to 5",
          "timestamp": "2024-01-08T14:04:47-05:00",
          "tree_id": "b15ae83b3cb7cc9a6917f28d6bc8287278b74637",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/6f6406ecb68e9e0fc05b788552820f8f3e6ff24f"
        },
        "date": 1704740804035,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8065308955406792,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2398781070000098 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8530998989937372,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1721956610000035 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.361047482083848,
            "unit": "iter/sec",
            "range": "stddev: 0.009639210456699037",
            "extra": "mean: 423.5408256666678 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.43024340959372925,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.3242657010000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.773417777363707,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 563.8829229999942 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.296416297478581,
            "unit": "iter/sec",
            "range": "stddev: 0.027905010753436585",
            "extra": "mean: 303.359742749997 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.10350242817902301,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.661609081000009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.5632940642142743,
            "unit": "iter/sec",
            "range": "stddev: 0.033057813854844444",
            "extra": "mean: 280.6392012500112 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3d85480377cb1362250643d2e7b553d4416ceb12",
          "message": "Merge pull request #111 from Janelia-Trackathon-2023/prune-tracking-graph\n\nPrune tracking graph API",
          "timestamp": "2024-01-10T14:47:43-05:00",
          "tree_id": "6ef987b7c05149cd961c96ef221afe3d9209ba41",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/3d85480377cb1362250643d2e7b553d4416ceb12"
        },
        "date": 1704916169219,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7477336807148622,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3373745569999755 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.856706278888814,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1672612010000023 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.3902217024485557,
            "unit": "iter/sec",
            "range": "stddev: 0.0024371439889245695",
            "extra": "mean: 418.371232666658 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4424264152581223,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.260262872000027 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 2.2623943060567497,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 442.00959899998793 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.686479447701984,
            "unit": "iter/sec",
            "range": "stddev: 0.024872129826475145",
            "extra": "mean: 271.26151499999906 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11746477317436715,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.513190576 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.7797972341948016,
            "unit": "iter/sec",
            "range": "stddev: 0.02842263324613906",
            "extra": "mean: 264.5644562499996 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "32de15e2e6a78c960d4a27eb7f0cb977b3dfd565",
          "message": "Merge pull request #136 from Janelia-Trackathon-2023/framebuffer\n\nChange `frame_buffer` kwarg to `max_frame_buffer`",
          "timestamp": "2024-01-11T11:21:17-08:00",
          "tree_id": "62e7765760dc89eb35e91d2eaef3ff2cd41e354f",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/32de15e2e6a78c960d4a27eb7f0cb977b3dfd565"
        },
        "date": 1705000982856,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7917143564716125,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2630818069999918 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8673344332290424,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1529577999999958 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.4083280484849583,
            "unit": "iter/sec",
            "range": "stddev: 0.006764977719031529",
            "extra": "mean: 415.22582466665386 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.44761024268648963,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.234086499 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 2.2478182080799773,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 444.8758340000154 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.646204403947264,
            "unit": "iter/sec",
            "range": "stddev: 0.020331304006517753",
            "extra": "mean: 274.2578005000027 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11794242472964236,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.478713255999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.7687108496954944,
            "unit": "iter/sec",
            "range": "stddev: 0.02987515980558008",
            "extra": "mean: 265.34272324999364 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9103c93e3bfafa272116eea1ecda76f2579034eb",
          "message": "Merge pull request #142 from Janelia-Trackathon-2023/pyarrow_dependency\n\nAdd pyarrow to pyproject",
          "timestamp": "2024-01-31T11:57:02-05:00",
          "tree_id": "18e98fdc65ee53fd08c07ca127a250b63cb1cca1",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/9103c93e3bfafa272116eea1ecda76f2579034eb"
        },
        "date": 1706720327762,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7887035436350088,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2679035209999938 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.863196988365098,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1584841159999968 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.4392222924792395,
            "unit": "iter/sec",
            "range": "stddev: 0.005204677621323579",
            "extra": "mean: 409.9667353333321 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.443642148771929,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.254068966999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 2.0025258098342475,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 499.36934400000155 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.892204175425113,
            "unit": "iter/sec",
            "range": "stddev: 0.029699301816843375",
            "extra": "mean: 256.923828999998 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11775474820063087,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.492226557999999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.848948312160316,
            "unit": "iter/sec",
            "range": "stddev: 0.032944105095292046",
            "extra": "mean: 259.81123125000494 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f4398e893f9858f6c12df51d0eea657a23b8f988",
          "message": "Merge pull request #140 from Janelia-Trackathon-2023/dependabot/github_actions/actions/cache-4\n\nci(dependabot): bump actions/cache from 3 to 4",
          "timestamp": "2024-02-02T16:34:56-05:00",
          "tree_id": "d9be1f8de0940edaf49e8d95b0738ad5b6384bc4",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/f4398e893f9858f6c12df51d0eea657a23b8f988"
        },
        "date": 1706909804666,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8053940623007345,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2416282249999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.864422547416895,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1568416429999928 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.381142411235138,
            "unit": "iter/sec",
            "range": "stddev: 0.003546245531461047",
            "extra": "mean: 419.9664813333375 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.4374445330448024,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2860041089999896 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.9772219718499249,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 505.76010899999346 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.8332624151036576,
            "unit": "iter/sec",
            "range": "stddev: 0.031448174460235734",
            "extra": "mean: 260.87439150000336 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11705616648374537,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.54290747799999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.73876545146003,
            "unit": "iter/sec",
            "range": "stddev: 0.03852088441112094",
            "extra": "mean: 267.4679685000001 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "894a5b6000a36547815352759a57c87d05f96636",
          "message": "Merge pull request #139 from Janelia-Trackathon-2023/fix-matcher-for-empty-frame\n\nFix CTC matching for emtpy frames",
          "timestamp": "2024-02-05T10:56:34-05:00",
          "tree_id": "2bc369958255cb448d0aaaf686b6efadfdec03d8",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/894a5b6000a36547815352759a57c87d05f96636"
        },
        "date": 1707148714928,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7790003170725976,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2836965250000105 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.863275041123575,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1583793719999989 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.399576261707513,
            "unit": "iter/sec",
            "range": "stddev: 0.004922482581942421",
            "extra": "mean: 416.74024533332005 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.42703974006241174,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.3417024370000092 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 2.2027923357813965,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 453.96925700001134 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.693112898872168,
            "unit": "iter/sec",
            "range": "stddev: 0.025518704704667026",
            "extra": "mean: 270.7742837500007 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11098699329596602,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.010064785999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.81337784887586,
            "unit": "iter/sec",
            "range": "stddev: 0.03438722455887047",
            "extra": "mean: 262.2347010000041 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "88752c4af00bfe6596ce30d6ec9af593603d1899",
          "message": "Merge pull request #143 from Janelia-Trackathon-2023/dependabot/github_actions/codecov/codecov-action-4\n\nci(dependabot): bump codecov/codecov-action from 3 to 4",
          "timestamp": "2024-02-05T12:49:43-05:00",
          "tree_id": "cb82537b58235a9cc231a53a6ae95bb4f57ccf30",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/88752c4af00bfe6596ce30d6ec9af593603d1899"
        },
        "date": 1707155491394,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7790533883697752,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2836090760000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8394668531241143,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.191232264000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.2674824741082853,
            "unit": "iter/sec",
            "range": "stddev: 0.005965934018778224",
            "extra": "mean: 441.01774166667457 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.41767021647006614,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.3942334419999725 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 2.1136139844513124,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 473.1232890000001 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.577759611921863,
            "unit": "iter/sec",
            "range": "stddev: 0.030470604174907965",
            "extra": "mean: 279.50452475000986 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11755557933981872,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.506614535999972 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6060858674295764,
            "unit": "iter/sec",
            "range": "stddev: 0.04056788672563926",
            "extra": "mean: 277.30898175001073 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4c729d2299a7304ddfb0a9e99f1e2e7a5dd4a26c",
          "message": "Merge pull request #144 from Janelia-Trackathon-2023/pre-commit-ci-update-config\n\nci(pre-commit.ci): autoupdate",
          "timestamp": "2024-02-06T11:02:13-05:00",
          "tree_id": "6e55bd57b103350902058a3bbfb23f28288b521f",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/4c729d2299a7304ddfb0a9e99f1e2e7a5dd4a26c"
        },
        "date": 1707235447026,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8062955030397794,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2402400810000103 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8480841787730313,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.179128234000018 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.277760248008335,
            "unit": "iter/sec",
            "range": "stddev: 0.00026900939322647353",
            "extra": "mean: 439.0277690000062 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.45011117165296044,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.2216733620000184 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 2.0486790396173373,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 488.11940799998865 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.8752103484764047,
            "unit": "iter/sec",
            "range": "stddev: 0.030267643053454713",
            "extra": "mean: 258.0505082500011 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.1184011499248503,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.445863917999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.8643821105591045,
            "unit": "iter/sec",
            "range": "stddev: 0.03383164648810717",
            "extra": "mean: 258.773581749999 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "bgallusser@googlemail.com",
            "name": "Benjamin Gallusser",
            "username": "bentaculum"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "46b99883e335eee0b0ded2c7175e5bdc7762d81f",
          "message": "Speed up CTCMatcher (#148)\n\nFor obtaining single-frame segmentation-label to node id mappings, it is faster (notably for larger graphs) to only get the node attribute dictionaries for the nodes present in the needed frame.\r\n\r\nFor example for PhC-C2DL-PSC, this leads to a ~3x speedup for matching.",
          "timestamp": "2024-04-12T15:46:56+02:00",
          "tree_id": "065817d39a8805f84a096c09d030dc2e37e92c79",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/46b99883e335eee0b0ded2c7175e5bdc7762d81f"
        },
        "date": 1712929722954,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7676735823431816,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.302636984000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8544514512767277,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.170341508000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.1789482993136433,
            "unit": "iter/sec",
            "range": "stddev: 0.02193829959276365",
            "extra": "mean: 458.937001999999 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5772179143945814,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7324479629999985 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8240717159041004,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 548.2240589999776 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.6875063593352624,
            "unit": "iter/sec",
            "range": "stddev: 0.03367711156809014",
            "extra": "mean: 271.18597299999436 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11710340885176387,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.539461060999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.639406451458339,
            "unit": "iter/sec",
            "range": "stddev: 0.041310574731282836",
            "extra": "mean: 274.7700794999943 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4022364e5bceb657af6f3e661c8a92890c5dcf35",
          "message": "Merge Remove support for python 3.8 (#151)",
          "timestamp": "2024-08-02T13:07:48-07:00",
          "tree_id": "84ee0cc03f6036472790000c903908ac9f748f1a",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/4022364e5bceb657af6f3e661c8a92890c5dcf35"
        },
        "date": 1722629748346,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8014190496303351,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2477866609999637 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8884075117935963,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1256095730000197 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.491451783254961,
            "unit": "iter/sec",
            "range": "stddev: 0.0025571638469003245",
            "extra": "mean: 401.3724073333454 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5936303615363975,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6845499569999447 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.9565363740227104,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 511.1072879999483 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.6176555555259777,
            "unit": "iter/sec",
            "range": "stddev: 0.02783891900401128",
            "extra": "mean: 276.4221150000026 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11875660578721019,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.420584213999973 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.768824716491095,
            "unit": "iter/sec",
            "range": "stddev: 0.03647174655392102",
            "extra": "mean: 265.3347064999707 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8627e36aed0de9cd2260d68ad0d3d82866c8616d",
          "message": "Merge pull request #146 from Janelia-Trackathon-2023/pre-commit-ci-update-config\n\nci(pre-commit.ci): autoupdate",
          "timestamp": "2024-08-02T16:40:59-04:00",
          "tree_id": "fcaedc5045b53feba6ff4f4fe0fba2d3d188e771",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/8627e36aed0de9cd2260d68ad0d3d82866c8616d"
        },
        "date": 1722631374200,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8052596623557713,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2418354560000182 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8965797306917438,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1153497739999807 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.523074464230802,
            "unit": "iter/sec",
            "range": "stddev: 0.0020133560691259064",
            "extra": "mean: 396.34184966667857 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5982372909506805,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6715775079999844 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.9546832872605235,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 511.5918299999862 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.5964272246789326,
            "unit": "iter/sec",
            "range": "stddev: 0.024490610871068214",
            "extra": "mean: 278.05372875000245 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11331850579420341,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.824683956000001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6898834434267944,
            "unit": "iter/sec",
            "range": "stddev: 0.03545546572970272",
            "extra": "mean: 271.0112704999972 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5d62111e8a6817a30746a3b4905c612edbf6d2cf",
          "message": "Merge pull request #145 from Janelia-Trackathon-2023/dependabot/github_actions/softprops/action-gh-release-2\n\nci(dependabot): bump softprops/action-gh-release from 1 to 2",
          "timestamp": "2024-08-02T16:46:41-04:00",
          "tree_id": "d97b5134955e178459b7fcc97970a9b7b7dff1a3",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/5d62111e8a6817a30746a3b4905c612edbf6d2cf"
        },
        "date": 1722631702931,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8504019160181144,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1759145659999888 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8967013503844381,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1151984990000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.553039502031299,
            "unit": "iter/sec",
            "range": "stddev: 0.0003716852139347667",
            "extra": "mean: 391.68998333334076 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5911478073836833,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.691624307000012 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 2.0509378302907084,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 487.5818200000026 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.7740861648308024,
            "unit": "iter/sec",
            "range": "stddev: 0.02607270683706954",
            "extra": "mean: 264.9648037500043 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11911657150432468,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.395137530999989 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.8916296982844196,
            "unit": "iter/sec",
            "range": "stddev: 0.03282174779445161",
            "extra": "mean: 256.96175574999813 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ffe7cb1dab76bbce7e2fe2f900a6f4d26050df51",
          "message": "Merge pull request #150 from Janelia-Trackathon-2023/iou-1-to-1\n\nAdd iou matcher option to use linear assignment to get one-to-one matching",
          "timestamp": "2024-08-02T13:50:25-07:00",
          "tree_id": "d7de93aa9cca7c45fec3498e971a3328230df6ba",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ffe7cb1dab76bbce7e2fe2f900a6f4d26050df51"
        },
        "date": 1722631945967,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7656031219696625,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3061597730000187 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8948417772804906,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1175159959999803 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.4584890455271644,
            "unit": "iter/sec",
            "range": "stddev: 0.004972455192621238",
            "extra": "mean: 406.75389700000625 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5784060639096876,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7288892050000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.7805941205483637,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 561.6103010000018 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.8166613369853826,
            "unit": "iter/sec",
            "range": "stddev: 0.03594179856132511",
            "extra": "mean: 262.0090994999984 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11957937733517968,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.362645987000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.658338249896093,
            "unit": "iter/sec",
            "range": "stddev: 0.0430451042060616",
            "extra": "mean: 273.34815199999696 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "280308d3b30cc9b76cc6b2f44fb5860d43118487",
          "message": "Merge pull request #153 from Janelia-Trackathon-2023/bugfix_iou\n\nFix multiple IOU-related bugs",
          "timestamp": "2024-08-05T16:04:24-04:00",
          "tree_id": "bb0ef4cb6960f62ca19ca8cff083347217942a56",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/280308d3b30cc9b76cc6b2f44fb5860d43118487"
        },
        "date": 1722888394543,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.747738820608491,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.337365363999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8686030461590855,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1512738810000087 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.420037753847385,
            "unit": "iter/sec",
            "range": "stddev: 0.004302257873694319",
            "extra": "mean: 413.21669399999905 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5804944393546416,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7226693870000531 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.9068236787488226,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 524.4323379999969 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.71196193225662,
            "unit": "iter/sec",
            "range": "stddev: 0.034809248748145095",
            "extra": "mean: 269.3993144999922 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11165354397651546,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.956276392000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.568703324761905,
            "unit": "iter/sec",
            "range": "stddev: 0.049734147323187754",
            "extra": "mean: 280.21382250000215 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "599aa8e250e638d25f17dd19cbe013a74159e8e6",
          "message": "Merge pull request #141 from Janelia-Trackathon-2023/check_empty_subgraph\n\nCheck empty subgraph",
          "timestamp": "2024-08-06T13:09:23-04:00",
          "tree_id": "881cc375ea701969471d2e232b1ffa1a2dfc1660",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/599aa8e250e638d25f17dd19cbe013a74159e8e6"
        },
        "date": 1722964263154,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.840896791436604,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.189206583000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8950697937474195,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1172313120000013 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.4590866426948126,
            "unit": "iter/sec",
            "range": "stddev: 0.006112280474474288",
            "extra": "mean: 406.65504933333335 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5882896091669961,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.699843044000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.972770040570345,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 506.90145300001177 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.799625697732578,
            "unit": "iter/sec",
            "range": "stddev: 0.03530472653035524",
            "extra": "mean: 263.1838185000035 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11779984631905056,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.48897542100002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.7321987508844563,
            "unit": "iter/sec",
            "range": "stddev: 0.03816582947056304",
            "extra": "mean: 267.93857100000906 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9475cb2d32b79093fe09fb050287dbc548e1f6e3",
          "message": "Merge pull request #154 from Janelia-Trackathon-2023/pre-commit-ci-update-config\n\nci(pre-commit.ci): autoupdate",
          "timestamp": "2024-08-06T13:12:38-04:00",
          "tree_id": "8ff638730166a79a4f4a885c9231d1dc82d51d8c",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/9475cb2d32b79093fe09fb050287dbc548e1f6e3"
        },
        "date": 1722964456948,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8546602269294917,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1700556179999921 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.9012974271099431,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1095116550000057 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.528464375232024,
            "unit": "iter/sec",
            "range": "stddev: 0.004383368951366354",
            "extra": "mean: 395.4969703333215 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.6017232622535529,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6618935359999796 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.97699669059249,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 505.81774100001553 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.8154940220341675,
            "unit": "iter/sec",
            "range": "stddev: 0.03301453868316172",
            "extra": "mean: 262.08925875000233 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.11917785258977104,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.390820762999965 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.7217298851722243,
            "unit": "iter/sec",
            "range": "stddev: 0.03871818738033638",
            "extra": "mean: 268.6922562500058 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "bgallusser@googlemail.com",
            "name": "Benjamin Gallusser",
            "username": "bentaculum"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4160403789bc4401e954cc28783da608efdf7df3",
          "message": "Speed up IoU Matcher (#156)\n\nThis commit brings the speed ups already in place in the CTC matcher to\r\nthe IoU matcher. It calculates the IoU on local crops instead of full\r\nlabel images.",
          "timestamp": "2024-08-14T16:00:27+02:00",
          "tree_id": "b12dbf5c41b7b5dc30efc482c65a33e705a71676",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/4160403789bc4401e954cc28783da608efdf7df3"
        },
        "date": 1723644120108,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8158418213373478,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2257277990000262 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8555035693127526,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.168902194999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.3352539247813224,
            "unit": "iter/sec",
            "range": "stddev: 0.003393657288788132",
            "extra": "mean: 428.21895699999385 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.565760838510801,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.767531316999964 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8380180768710448,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 544.0642899999943 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.6921428489220736,
            "unit": "iter/sec",
            "range": "stddev: 0.03599064605093471",
            "extra": "mean: 270.84542524998767 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.556811103034329,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7959411990000262 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.4834677244844765,
            "unit": "iter/sec",
            "range": "stddev: 0.038155637820505746",
            "extra": "mean: 287.07026420001966 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2f38c1b89d0f51ba6ff13c7a24f3aaebe65ee17e",
          "message": "Merge pull request #160 from Janelia-Trackathon-2023/release-notes\n\nGroup PRs in release notes based on labels",
          "timestamp": "2024-09-16T12:02:04-07:00",
          "tree_id": "b6d88a151366c11d38d790ac2f13426b8f150910",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/2f38c1b89d0f51ba6ff13c7a24f3aaebe65ee17e"
        },
        "date": 1726513405231,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8183151740958517,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2220230439999966 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8810784790372477,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1349726770000075 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.444471089179266,
            "unit": "iter/sec",
            "range": "stddev: 0.00440838388216874",
            "extra": "mean: 409.0864500000085 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5577083827248006,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7930517650000013 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.818799551954739,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 549.813198999999 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.5342691925591203,
            "unit": "iter/sec",
            "range": "stddev: 0.04301793205532706",
            "extra": "mean: 282.94392575001126 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.5359016929287209,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.866013885000001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6601664273464056,
            "unit": "iter/sec",
            "range": "stddev: 0.0397589261616889",
            "extra": "mean: 273.21162025000945 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6f7191051b05a51e2229657cb64c2c8328899309",
          "message": "Merge pull request #159 from Janelia-Trackathon-2023/templates\n\nReduce number of checkboxes in issue and PR templates",
          "timestamp": "2024-09-16T12:06:30-07:00",
          "tree_id": "2b445736ce7fffb6cfb04f27b7c1563b63911cdd",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/6f7191051b05a51e2229657cb64c2c8328899309"
        },
        "date": 1726513675943,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.8260237732450366,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.210618910000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8765435728521538,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.140844598000001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.561494174880483,
            "unit": "iter/sec",
            "range": "stddev: 0.002058230842628897",
            "extra": "mean: 390.39713999999987 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5823265773991426,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7172494590000014 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.929283759134388,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 518.3270710000016 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.6943621600698155,
            "unit": "iter/sec",
            "range": "stddev: 0.03249940063741546",
            "extra": "mean: 270.6827205000124 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.5487816645065426,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8222183149999864 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.6078265971384527,
            "unit": "iter/sec",
            "range": "stddev: 0.0373666461339545",
            "extra": "mean: 277.1751837500034 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ba122c779d534307c922a8705960c60dede9aa54",
          "message": "Merge pull request #155 from Janelia-Trackathon-2023/bugfix_frame_buffer\n\nFix frame buffer bug where predecessors were not checked properly",
          "timestamp": "2024-09-16T12:09:37-07:00",
          "tree_id": "b880ea5e71dfc13e8dfb377d845495bd568820a5",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ba122c779d534307c922a8705960c60dede9aa54"
        },
        "date": 1726513861298,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7976554042490982,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2536741989999882 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8694434665765526,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1501610379999931 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.511843907093604,
            "unit": "iter/sec",
            "range": "stddev: 0.0045034810925761",
            "extra": "mean: 398.1139103333362 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5656339828969151,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7679277240000033 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8650917861465497,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 536.166642000012 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.633862145126041,
            "unit": "iter/sec",
            "range": "stddev: 0.04249957967983197",
            "extra": "mean: 275.18930550000675 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.5615815517989288,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7806852749999962 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.709744985628287,
            "unit": "iter/sec",
            "range": "stddev: 0.0346346738205875",
            "extra": "mean: 269.5603077500053 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ab3cccf18542a072eeff22373b0a47fb71897d19",
          "message": "Merge pull request #116 from Janelia-Trackathon-2023/docs-metrics-pages\n\nAdd written documentation for errors and metrics",
          "timestamp": "2024-09-18T10:20:12-07:00",
          "tree_id": "7a1493c85ea4c3f233694e414cf021a6ed914c81",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ab3cccf18542a072eeff22373b0a47fb71897d19"
        },
        "date": 1726680091275,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_data",
            "value": 0.7906470076989875,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2647869280000066 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_data",
            "value": 0.8379739745461743,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1933544840000252 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks",
            "value": 2.254168976194308,
            "unit": "iter/sec",
            "range": "stddev: 0.023794393956266757",
            "extra": "mean: 443.62246599999366 msec\nrounds: 3"
          },
          {
            "name": "tests/bench.py::test_ctc_matched",
            "value": 0.5769456305044343,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7332655749999901 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics",
            "value": 1.8249332016962134,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 547.9652620000195 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_div_metrics",
            "value": 3.6753524770987958,
            "unit": "iter/sec",
            "range": "stddev: 0.03926560942936718",
            "extra": "mean: 272.0827475000078 msec\nrounds: 4"
          },
          {
            "name": "tests/bench.py::test_iou_matched",
            "value": 0.5506125294590093,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8161591799999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics",
            "value": 3.5539784199783084,
            "unit": "iter/sec",
            "range": "stddev: 0.043454480986479645",
            "extra": "mean: 281.37480924999636 msec\nrounds: 4"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "bgallusser@googlemail.com",
            "name": "Benjamin Gallusser",
            "username": "bentaculum"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b5adc6817d8f0c19c571e1d9ef01e2ab8801b500",
          "message": "Merge pull request #167 from Janelia-Trackathon-2023/fix-benchmark-report\n\nAdd data download to benchmark report action",
          "timestamp": "2024-11-14T17:24:46+01:00",
          "tree_id": "fce4a3a13cfd3063b668b34140483defe7a2dd27",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/b5adc6817d8f0c19c571e1d9ef01e2ab8801b500"
        },
        "date": 1731602071408,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1632457191414743,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.125734905999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06048659603035379,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.53258846799997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8683362158405495,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1516276549999702 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3534921241179643,
            "unit": "iter/sec",
            "range": "stddev: 0.005615308897691673",
            "extra": "mean: 738.8295670000105 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10209192842130888,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.795093651999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6905769554865047,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4480645379999828 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05940877977258453,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.832528858999922 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.6760592615303413,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 272.0304350000333 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.2907263361477307,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.4396608619999824 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6356871573924834,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.573100838000073 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05616017315614575,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.806212905000052 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.362883836487578,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.83414599994376 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3616955321858362,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 734.3785570000136 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a78b48c58bbdc76a7eccfc266cd8b747eb4f8e1d",
          "message": "Merge pull request #170 from Janelia-Trackathon-2023/matcher-metric-val\n\nMetrics validate that the matcher is supported",
          "timestamp": "2024-11-26T14:55:35-05:00",
          "tree_id": "5257188a6330fd67ef15ffc1adcff84b45d168df",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/a78b48c58bbdc76a7eccfc266cd8b747eb4f8e1d"
        },
        "date": 1732651660378,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16326719892906466,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.124928991000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.059375550858528546,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.841949010000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8590748268391766,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1640429550000135 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3399006051414495,
            "unit": "iter/sec",
            "range": "stddev: 0.0005469845718583158",
            "extra": "mean: 746.3240154999653 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10224861748560383,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.780083336000075 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6797935873391756,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.471034765000013 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.0591853041230782,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.896086195999942 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.5707122865440524,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 280.05616799998734 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.27639947005332816,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.6179519439999694 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6360722253091611,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.572148507999941 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05616003433471741,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.80625692000001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.599681647779569,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.53113299996039 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.360754112620353,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 734.8866270000372 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f0584edd406dfb69c5fd9b12863d9782fb2691da",
          "message": "ci(pre-commit.ci): autoupdate (#158)\n\n* ci(pre-commit.ci): autoupdate\r\n\r\nupdates:\r\n- [github.com/crate-ci/typos: v1.23.6 → typos-dict-v0.11.37](https://github.com/crate-ci/typos/compare/v1.23.6...typos-dict-v0.11.37)\r\n- [github.com/astral-sh/ruff-pre-commit: v0.5.6 → v0.8.1](https://github.com/astral-sh/ruff-pre-commit/compare/v0.5.6...v0.8.1)\r\n- [github.com/psf/black: 24.8.0 → 24.10.0](https://github.com/psf/black/compare/24.8.0...24.10.0)\r\n- [github.com/abravalheri/validate-pyproject: v0.18 → v0.23](https://github.com/abravalheri/validate-pyproject/compare/v0.18...v0.23)\r\n- [github.com/pre-commit/mirrors-mypy: v1.11.1 → v1.13.0](https://github.com/pre-commit/mirrors-mypy/compare/v1.11.1...v1.13.0)\r\n\r\n* style(pre-commit.ci): auto fixes [...]\r\n\r\n---------\r\n\r\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2024-12-03T11:40:51-05:00",
          "tree_id": "1e2aca18cdba887ce9ba9cd955c0b67847de2738",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/f0584edd406dfb69c5fd9b12863d9782fb2691da"
        },
        "date": 1733244428796,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16761540460901375,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.966038756000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.058280505654749855,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.158396084000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8465728530243279,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1812332470000229 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3312208766105151,
            "unit": "iter/sec",
            "range": "stddev: 0.0031108208244432054",
            "extra": "mean: 751.1901424999792 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10132708454499006,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.869029632999968 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6764541688423078,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4782967510000162 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.059197875811904485,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.892498020999994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.535611426065509,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 282.83651099997087 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.23899916823031453,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.184114980000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6260826538204145,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5972331990000157 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05574864192458829,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.937656693999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.392523516204793,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 80.69381500001782 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3343018532346582,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 749.4556030000012 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "369b29469f104d8c976d1adbff40a7cbed97d832",
          "message": "ci(dependabot): bump codecov/codecov-action from 4 to 5 (#168)\n\nBumps [codecov/codecov-action](https://github.com/codecov/codecov-action) from 4 to 5.\r\n- [Release notes](https://github.com/codecov/codecov-action/releases)\r\n- [Changelog](https://github.com/codecov/codecov-action/blob/main/CHANGELOG.md)\r\n- [Commits](https://github.com/codecov/codecov-action/compare/v4...v5)\r\n\r\n---\r\nupdated-dependencies:\r\n- dependency-name: codecov/codecov-action\r\n  dependency-type: direct:production\r\n  update-type: version-update:semver-major\r\n...\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\r\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2024-12-03T12:50:06-05:00",
          "tree_id": "901c3aa755b06c22c9261d8f28e611c5af15f806",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/369b29469f104d8c976d1adbff40a7cbed97d832"
        },
        "date": 1733248537381,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1705511427340492,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.863343885999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05916939008271161,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.900630522 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8510610680035171,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1750038130000178 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.340952746631447,
            "unit": "iter/sec",
            "range": "stddev: 0.0019320660419939787",
            "extra": "mean: 745.7384330000139 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10012582102035598,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.987433708999959 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6834957000721532,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4630669950000197 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05888201972058093,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.983113091999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.7511730621515995,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 266.5832749999595 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.24310177851411,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.1135034310000265 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6342451783027695,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.576677339000014 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.056055814828189554,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.839362483000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.593120521712212,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.56662499995537 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3727542843259652,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 728.4624870000016 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6212b53c87627d209f65695b937ca271c26a8156",
          "message": "Merge pull request #171 from Janelia-Trackathon-2023/unit_tests\n\nCanonical unit test examples: Segmentations for matching, and matched graphs without divisions",
          "timestamp": "2024-12-09T15:47:12-05:00",
          "tree_id": "c8435c3858f60ad7ba20a11302e529e3c2b60513",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/6212b53c87627d209f65695b937ca271c26a8156"
        },
        "date": 1733777567522,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17550905290701008,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.697711789999971 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05215236591256234,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.174585515000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9096305722359985,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0993473949999952 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3196597509651362,
            "unit": "iter/sec",
            "range": "stddev: 0.0062149241344017095",
            "extra": "mean: 757.7710839999838 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09809719743895727,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.193971143999988 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6792460148616049,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4722206359999745 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05927232442152023,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.87128031100002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.3247010462897832,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 300.77892299999576 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.24024867615766146,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.16235384099997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6445431368609117,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.551486538000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05598483288780908,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.861980619000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.95667744043681,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 71.650290999969 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3970919335810321,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 715.7725099999652 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "48351ed9eaec5075e940fea1914d2de3cbe40448",
          "message": "Merge pull request #172 Add tests cases to docs using example notebook",
          "timestamp": "2024-12-17T11:00:04-05:00",
          "tree_id": "6235ac9a0e4921874aa789e33148a53f322494e0",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/48351ed9eaec5075e940fea1914d2de3cbe40448"
        },
        "date": 1734451871700,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17150621821297288,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.830692381999938 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06094021889119028,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.409524255000065 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8587140799074054,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.164531970999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.324224826777263,
            "unit": "iter/sec",
            "range": "stddev: 0.0039152636825606",
            "extra": "mean: 755.1587764999681 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10392187146719611,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.62261346799994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6487565324414526,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5414102979999598 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.058636989258310124,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.054081606999944 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.811499095334893,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 262.3639610000055 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.25406187998119983,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.9360489659999303 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6332706111511948,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5791037550000055 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05539840417252884,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.051061487000084 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.188243485236955,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.48088800002006 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.415476910315246,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 706.4756710000211 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "af21f3ee992d2a6bf49d7f3407c4a602f2fb8b30",
          "message": "Merge pull request #173 Test the IOU matcher using standardized segmentation test cases",
          "timestamp": "2024-12-18T15:27:49-05:00",
          "tree_id": "9ab83cb6835b6754ce5d101c90978a79c2822928",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/af21f3ee992d2a6bf49d7f3407c4a602f2fb8b30"
        },
        "date": 1734553995750,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17547657645672388,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.6987662980000096 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05198832299967722,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.23508861800002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8734604621727999,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1448715120000088 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3494822837395335,
            "unit": "iter/sec",
            "range": "stddev: 0.0011984144722225307",
            "extra": "mean: 741.0249189999831 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10208223212976147,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.796024039999963 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6645681982121401,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.504736462999972 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05886325463300865,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.988527159 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.3945766213940725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 294.5875469999919 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.24433713958699546,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.092705684000009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6290501658341987,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5896983330000012 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05578009308001936,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.927542690999985 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.813315515484177,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 78.04381299996521 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.408003349831437,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 710.2255830000104 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "68d63ad2bf387b8b75a338b326f58f8152e90771",
          "message": "Merge pull request #175 Add standard division test cases",
          "timestamp": "2024-12-18T16:12:40-05:00",
          "tree_id": "7f99c9112de3d38b2470eea8d6739bc0097fa0d5",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/68d63ad2bf387b8b75a338b326f58f8152e90771"
        },
        "date": 1734556682439,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1814181159500801,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.512128679999989 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05228684290607731,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.125270228999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8949902970924662,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1173305490000018 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3546728067879967,
            "unit": "iter/sec",
            "range": "stddev: 0.00037633283556411605",
            "extra": "mean: 738.1856304999985 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10354352533679813,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.657774320000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6438290344242094,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5532073679999883 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.0582124875854303,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.178444719999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.6754855445967056,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 272.0728969999868 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.24219765433533702,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.1288591449999785 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6065641612903263,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6486302090000322 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.054717837306721584,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.275576105000027 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.620835203192017,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.41693699999041 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3789731392952311,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 725.1772870000082 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2ce238f880d22fa3df62d432c0257fb5a5f8ae5f",
          "message": "Merge pull request #177 Test division errors using standard test cases",
          "timestamp": "2024-12-19T15:51:33-05:00",
          "tree_id": "88813e7a02bfcc29532513ec109a54650b85b9ca",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/2ce238f880d22fa3df62d432c0257fb5a5f8ae5f"
        },
        "date": 1734641829156,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18054186288203752,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.53888158700002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05215621148200062,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.17317173899997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.89505340572438,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.117251768000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.337265505495556,
            "unit": "iter/sec",
            "range": "stddev: 0.0010435920282600131",
            "extra": "mean: 747.7946570000142 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10390995915829382,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.623716610999963 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6769675713144933,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4771756320000122 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05946913364127784,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.815445909000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.6798646816607254,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 271.7491230000064 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.23967893026584253,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.172248260999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6384593499849632,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5662704289999851 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05589191705588319,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.891674729999977 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.174970885944372,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 75.9014960000286 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3972836077284236,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 715.6743229999734 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "69ffb71a093b968aef4a316354007e421b8df28a",
          "message": "Add written documentation for the ctc error types with example graphs (#178)\n\n* Add written documentation for the ctc error types with example graphs\n\n* Add matplotlib as dependency for new plots in the docs\n\n* Fix path to import of example graphs\n\n* Try different path configuration for rtd build\n\n* Try path with two ../\n\n* Correct imports with two ../\n\n* Draga's edits from code review\n\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>\n\n---------\n\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2025-01-07T13:14:29-05:00",
          "tree_id": "471247f5959d94d0664391f25bf6d28fda386ba2",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/69ffb71a093b968aef4a316354007e421b8df28a"
        },
        "date": 1736274329989,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16705401785267726,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.986087690999966 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05890746967651795,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.97577583100002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8424472946312228,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.187017878000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.259848464582615,
            "unit": "iter/sec",
            "range": "stddev: 0.006704898929159567",
            "extra": "mean: 793.7462544999789 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0948270591499265,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.545513158000063 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6388448262705881,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5653253479999876 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.058703985434229125,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.03461856299998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.1878725371760672,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 313.6888279999539 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.26342011656916514,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.796217286000001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6295153336831939,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.588523656999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05497647607029903,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.189598014999888 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.24057971812586,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 75.52539400001024 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.370252512667845,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 729.7924950000834 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b367f32072a7c0eb9c4dab9ba6ee50aeebaa7819",
          "message": "Add tests for CTC node and edge track errors (#176)\n\n* Test ctc node errors with graph test cases\n\n* Start drafting ctc edge error tests -- currently failing and incomplete\n\n* Fix obvious issues with CTC error tests\n\n* Add tests cases for non split edges and crossover/identity switch edges\n\n* Add test for two to one with edges\n\n* Add test for crossover edge\n\n* Add division test cases\n\n* Add test description back to notebook\n\n* Annotate div cases with one to one matching\n\n* Add division cases to collection of plots of test cases\n\n* Add additional context to testing non sequential ids\n\n* Correct notebook header levels\n\n* Add test cases for limits of matching in shifted division cases\n\n* Differentiate between standard test case testing and end to end tests\n\n* Add tests for intertrack edges\n\n* Update tests to reflect correct ctc behavior\n\n* Remove leftover comments and test code from ctc edge errors\n\n* Rename node/edge flags to prefix with CTC\n\n* Improve AssertionError test with explicit match\n\n* Draga's improvements/clarifications to test comments\n\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>\n\n* Improvements based on Draga's questions\n\n* Update ctc errors docs to match changes introduced in last merge\n\n* Correction to notebook for test examples\n\n---------\n\nCo-authored-by: Caroline Malin-Mayor <malinmayorc@janelia.hhmi.org>\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2025-01-07T13:34:45-05:00",
          "tree_id": "e25113db496b9928d6d259c9a824ac01e7600aa5",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/b367f32072a7c0eb9c4dab9ba6ee50aeebaa7819"
        },
        "date": 1736275228670,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18145758679429064,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.510929675999989 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05119508112287133,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.533126583000012 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8706866178422035,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1485188579999885 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3547966642622078,
            "unit": "iter/sec",
            "range": "stddev: 0.0011074628624909242",
            "extra": "mean: 738.1181444999925 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10201018698719759,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.802942524999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6644210126762566,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5050697989999549 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05909931903307254,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.920668738000018 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.656214354195123,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.5069400000043 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.21854567581524123,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.575702522000029 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6385533491119338,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.566039864000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055614091865160455,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.98105419799998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.671333914234385,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.14575200001627 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3873058091814048,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 720.821605000026 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fd11de3d30cb6ed88750ed76db15b381ee82a0c0",
          "message": "Update the test case notebook with py:percent files (#180)\n\n* Test ctc node errors with graph test cases\n\n* Start drafting ctc edge error tests -- currently failing and incomplete\n\n* Fix obvious issues with CTC error tests\n\n* Add tests cases for non split edges and crossover/identity switch edges\n\n* Add test for two to one with edges\n\n* Add test for crossover edge\n\n* Add division test cases\n\n* Add test description back to notebook\n\n* Annotate div cases with one to one matching\n\n* Add division cases to collection of plots of test cases\n\n* Add additional context to testing non sequential ids\n\n* Correct notebook header levels\n\n* Add test cases for limits of matching in shifted division cases\n\n* Differentiate between standard test case testing and end to end tests\n\n* Add tests for intertrack edges\n\n* Update tests to reflect correct ctc behavior\n\n* Remove leftover comments and test code from ctc edge errors\n\n* Rename node/edge flags to prefix with CTC\n\n* Replace the test case notebook with three py:percent files\n\n* Remove old test case example notebook\n\n* Add jupytext as docs dependency\n\n* Add ipykernel as a docs dependency for running notebooks during docs build\n\n* Add matplotlib as dependency for docs\n\n* Try a different path for sys appending path to examples tests\n\n* Correct path to get jupyter-execute blocks to run\n\n* Try conditional path depending on local vs rtd\n\n* Try path based on calling from docs/source\n\n* Correct intro text on test case files\n\n* Make plot names more consistent\n\n* Add landing page for test cases\n\n---------\n\nCo-authored-by: Caroline Malin-Mayor <malinmayorc@janelia.hhmi.org>",
          "timestamp": "2025-01-14T14:01:54-05:00",
          "tree_id": "e0ce9938efd81276c309d40da55b3d4473038eb4",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/fd11de3d30cb6ed88750ed76db15b381ee82a0c0"
        },
        "date": 1736881645211,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1789486420833035,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.588195519999999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.050101675257571546,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.959412431999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.866975590703654,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1534350109999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3485568927155607,
            "unit": "iter/sec",
            "range": "stddev: 0.003938009893390217",
            "extra": "mean: 741.5334165000047 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10174342843507084,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.82864461500003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6555014260977811,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5255496939999489 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05827654236396069,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.159562998000013 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.284873143733923,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 304.42575900002566 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.22894521641072763,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.367857147999985 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.59559815417557,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.678984383999989 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05478875215695472,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.251921436999964 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.36125907740553,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.84324600000036 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.432234384377949,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 698.2097419999604 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6b0bfabdc8bee409ff0ef5859f8e9b9d17f70fb2",
          "message": "Add example graph plots for division error documentation (#189)",
          "timestamp": "2025-01-15T11:25:53-05:00",
          "tree_id": "c23594141b46bd7dc6dcd7a0cf503d52a21f0321",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/6b0bfabdc8bee409ff0ef5859f8e9b9d17f70fb2"
        },
        "date": 1736958697209,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.180949838286614,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.526393443999979 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05260054713554241,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.01120909300002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8894779636575585,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1242549459999793 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3240892632843757,
            "unit": "iter/sec",
            "range": "stddev: 0.0021381600915577896",
            "extra": "mean: 755.2360914999952 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09780283398405382,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.224652591999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6598339776156755,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5155327460000194 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.058804849957779716,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.00540007699999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.493177783617623,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 286.27228899995316 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.23219006083492116,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.306816563999973 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6460339329530037,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5479063079999946 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05616483068085899,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.80473630700004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.201416301576446,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.4155119999541 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.4135873301728725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 707.4200359999736 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "79b06ac32021bdcca511b1e971da5a8f23638ec4",
          "message": "Update node and edge annotations to be sparse (#192)\n\n* Add functions for removing node and edge flags\n\n* Remove flags when correcting shifted divisions instead of flipping to False\n\n* Make ctc node error flags sparse and update tests for new behavior\n\n* Fix error in mapping for ns vertex test\n\n* Update ctc edge flags to be sparse\n\n* Update ns error test to reflect sparse flags\n\n* Draga's docstring improvements\n\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>\n\n---------\n\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2025-01-16T11:10:03-05:00",
          "tree_id": "04803ccb827c356791b79ce0a92215a30e85561e",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/79b06ac32021bdcca511b1e971da5a8f23638ec4"
        },
        "date": 1737044135518,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17813459797174322,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.613732600999981 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05068927823938989,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.728037855999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8607976208600399,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1617132480000123 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3479401392778052,
            "unit": "iter/sec",
            "range": "stddev: 0.0003389233512724755",
            "extra": "mean: 741.8727070000131 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10056789071762226,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.943531607000011 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6612776129742333,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5122241860000258 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05881065975055135,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.003720145999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.373354200362396,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 296.44085400002496 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.22325759624276298,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.479130908999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6293930545571385,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5888322769999945 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055291550012400006,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.08594622100003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.30896355634323,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 75.13733100000763 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.341760105610459,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 745.2897100000087 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cbdee0be26fdabbccdd68b3efd07dea0afcd2a95",
          "message": "Update example notebooks and run in CI (#196)\n\n* Add action to run example notebooks\n\n* Add ipykernel for notebook execution action\n\n* Correct current bugs in ctc example",
          "timestamp": "2025-01-21T12:56:45-05:00",
          "tree_id": "fc7c529d74ee940d575bcc215fcb3bf6bc3d8a48",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/cbdee0be26fdabbccdd68b3efd07dea0afcd2a95"
        },
        "date": 1737482537479,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17860452807286917,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.598962192000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05183276564264747,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.292815801000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8594619233602668,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1635186769999848 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3552592680063962,
            "unit": "iter/sec",
            "range": "stddev: 0.00042719219789042937",
            "extra": "mean: 737.8661955000041 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.1005467968887755,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.945617671999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.64308971951559,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.554992980999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.0585990133759711,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.06513373499999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.9248496324366138,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 254.7868309999899 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.23152530348689085,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.319182331000036 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6174973058469082,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6194402639999907 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05497081993447882,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.19146960500001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.270128243319139,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 75.35722199997963 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3928366115003354,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 717.9593010000076 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e4c7fede9147675d6607a142066217f2b13a621a",
          "message": "Merge pull request #199 from Janelia-Trackathon-2023/165_memory_in_ctc_loader\n\nPre-allocate numpy array and populate during reading for ctc loader",
          "timestamp": "2025-01-21T15:46:47-05:00",
          "tree_id": "e5b17be6ce693c5a9f136f4bbb05bce1fed2a8f9",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/e4c7fede9147675d6607a142066217f2b13a621a"
        },
        "date": 1737492731587,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1788220571045506,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.592151305000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.060841910566546364,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.436038755 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9262851796291531,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0795811289999904 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3385282471262163,
            "unit": "iter/sec",
            "range": "stddev: 0.0087259098118801",
            "extra": "mean: 747.0892020000122 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10040472039342717,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.959691098999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6557956471511523,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5248652599999843 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05819045052990063,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.18495029500002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.5819187834593156,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 279.17997599996625 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.22645519914520756,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.4158844830000135 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6311780862986898,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5843389080000065 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.0547975740279081,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.248983057000032 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.129290332050775,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 76.16557900001908 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3641985957643878,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 733.031101999984 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "239000a88bc773828f54de60fdd5cdb7778c0573",
          "message": "Merge pull request #186 from Janelia-Trackathon-2023/pre-commit-ci-update-config\n\nci(pre-commit.ci): autoupdate",
          "timestamp": "2025-01-22T12:47:56-05:00",
          "tree_id": "5cbdf309a456fe134845692c163fb72640a8c48e",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/239000a88bc773828f54de60fdd5cdb7778c0573"
        },
        "date": 1737568630050,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1726673113176561,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.791484169 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06617017457202594,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.11254891599998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8903912630834634,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1231017659999907 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3367297015058588,
            "unit": "iter/sec",
            "range": "stddev: 0.004008715621795999",
            "extra": "mean: 748.0943969999885 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0990458922570075,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.09632986500003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6712052671893578,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4898572000000172 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.058684896799344105,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.04015947099998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.778042011517359,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.6873690000007 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.28416245126660394,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.519113786999924 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6376804800040705,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5681834890000346 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05532674357610635,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.074441678000085 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.085535170895652,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 76.42026000007718 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3663862513690321,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 731.85748100002 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d7c1ac3cd475d71e598aad4a41ec65c1d80b1546",
          "message": "Bugfix: fix testing issue with GT nodes matched to NS nodes (#200)\n\nRewrite test for gt nodes matched to NS",
          "timestamp": "2025-01-22T17:14:46-05:00",
          "tree_id": "7502799aa1066189a49195c7de9b9bb090ce3395",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/d7c1ac3cd475d71e598aad4a41ec65c1d80b1546"
        },
        "date": 1737584409967,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18138571214250507,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.513113398999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06384763701467984,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.66228676199998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9052687713425137,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1046443129999943 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3386579819998539,
            "unit": "iter/sec",
            "range": "stddev: 0.001586674785003969",
            "extra": "mean: 747.0167984999989 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09847344161604579,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.15502234500002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6626241513316904,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.509151150000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.058526683183223495,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.08622367800004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.631200122606989,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 275.39104599998154 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.24190016960651284,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.133936746000018 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6340515808772549,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5771587520000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055151461106425825,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.131885899999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.276825746761036,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 75.31920799999625 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 1.3497310739793835,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 740.888329000029 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "85d4bc92163293ad8bd86c2d7b5f4dc3678bf956",
          "message": "Add dictionary mappings to the Matched class (#201)\n\n* Add dictionary mappings to the Matched class\n\n* Replace one off dictionary mappers with new Matched properties\n\n* Add getter functions for looking up matches and standardizing behavior",
          "timestamp": "2025-01-23T14:24:59-05:00",
          "tree_id": "5e7e7dfb53964234017e3ff6f023ec7e3e192f13",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/85d4bc92163293ad8bd86c2d7b5f4dc3678bf956"
        },
        "date": 1737660609998,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18936556712400943,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.280791092000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06265542824002884,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.960309076000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9548067325469821,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0473323719999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3413831227938542,
            "unit": "iter/sec",
            "range": "stddev: 0.0006929667668596137",
            "extra": "mean: 745.4991665000108 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10291565654636713,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.716694559000018 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6898177795909539,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4496581989999981 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05943892418410291,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.82399225299997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.842205640551529,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 206.51745800000754 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.22991229224716303,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.349484711000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6457115786441352,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5486790589999941 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05601604197313655,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.852028897000025 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 246.57361307190075,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.055584000013823 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 103.03237679097187,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.705687000007401 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "81b3449d9e6a4e6ff49ff2a1b82e50ec8057c237",
          "message": "Incorrect daughter in division is labeled as wrong child (#193)\n\n* Incorrect daughter in div produces FP and FN\n\n* Add new test case with division with both daughters not matched\n\n* Introduce wrong child division error\n\n* Correct plot annotation in documentation\n\n* Correct handling of case when gt div node has match but it is not a division\n\n* Update division metrics to handle wrong children divisions\n\n* Include wc division in mbc calculation\n\n* Remove unnecessary bool flag from setting flag on nodes",
          "timestamp": "2025-01-23T14:27:05-05:00",
          "tree_id": "8ef36af15888b2a200c4f11fb214140e55696e71",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/81b3449d9e6a4e6ff49ff2a1b82e50ec8057c237"
        },
        "date": 1737660783099,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17305336728885218,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.778564240999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.060469544167347754,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.537250508 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9084648694318335,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1007580300000086 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.333711839864299,
            "unit": "iter/sec",
            "range": "stddev: 0.0020606965436452723",
            "extra": "mean: 749.7871505000262 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09625037464580027,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.38956994900002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6415669178739151,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5586838599999737 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.0571957656773557,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.48381175000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.358597013996527,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 229.43162600000733 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.2229629106598274,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.4850508860000105 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.61100476440802,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6366484490000062 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05419525499245962,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.45179988800004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 234.1579282842181,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.27062199997863 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 100.954321197929,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.905470000035166 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b675e2770bd4ff43c0abe96acd71c6850dd8833c",
          "message": "Merge pull request #197 from Janelia-Trackathon-2023/refactor_overlap\n\nRemove unnecessary casting in get_labels_with_overlap",
          "timestamp": "2025-01-30T11:06:34-05:00",
          "tree_id": "26e8f8659a747ff57e32e774a454dda1533d2d76",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/b675e2770bd4ff43c0abe96acd71c6850dd8833c"
        },
        "date": 1738253560524,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18234500860761682,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.484109533000009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05974787403074235,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.736997193999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9143991340552228,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0936143340000228 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3264734810320915,
            "unit": "iter/sec",
            "range": "stddev: 0.0035115304591339064",
            "extra": "mean: 753.8786219999878 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09995598849865131,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.004403088000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6611281519610046,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5125660540000467 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05815872814653428,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.19432373899997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.902730773505795,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 256.2308439999583 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.22564263340148735,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.431786604000024 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.582909939661769,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7155308770000488 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05502498048577721,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.173563919000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 302.76176252219557,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.3029269999929056 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 110.09761364546677,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.082848999980797 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7a91b38cd99109de1832e8e1168cf808d625104a",
          "message": "Warn and return nans for metrics if there are no divisions in the gt (#198)\n\n* Warn and return nans for metrics if there are no divisions in the gt\n\n* style(pre-commit.ci): auto fixes [...]\n\n* Add better testing for DivisionMetrics\n\n* style(pre-commit.ci): auto fixes [...]\n\n* Remove duplicate test case\n\n* Fix error introduced by merge\n\n* Add pragma no qa lines for except zerodivision blocks\n\n* Refactor each metric into an individual helper function for easier testing and clearer code\n\n---------\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2025-02-03T10:45:56-05:00",
          "tree_id": "afdf5a177006308558882b61a65e0c2dc3214c92",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/7a91b38cd99109de1832e8e1168cf808d625104a"
        },
        "date": 1738597888217,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1886710372029428,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.3002305750000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.0630355271299473,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.864069764000021 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9356473075153854,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.068778793000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3630581531286947,
            "unit": "iter/sec",
            "range": "stddev: 0.006798753919358907",
            "extra": "mean: 733.6444139999827 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10357038110572117,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.655270062 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6756057272019138,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4801532309999743 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05843729994057926,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.112358049000022 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.8325800710195628,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 260.92083700001467 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.244491536013527,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.090121140000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.5872562139942292,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7028342589999852 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05514446269419741,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.134187026999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 193.60428252665793,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.165175000001909 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 67.06573461408193,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.910743999962506 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "31be450848eb66a86bdb574afac2b8bc48237e68",
          "message": "Compute the matching type for each dataset and use for metric validation (#202)\n\n* Add a matching_type property that directly computes the type of matching\n\n* Use new matching_type in metrics\n\n* Streamline computation and improve docstring\n\n* Correct flipped direction of matching types in implementation and tests\n\n* Matcher sets matching type if known\n\n* Add test for matcher override\n\n* Remove part of test that no longer applies with new matching validation scheme",
          "timestamp": "2025-02-06T10:30:01-05:00",
          "tree_id": "085e1c2b3ece99a1a7b592de86ceeb1e36d80a38",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/31be450848eb66a86bdb574afac2b8bc48237e68"
        },
        "date": 1738856131519,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18214447022274194,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.490147457000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05961090682106279,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.77545357599999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9111237728362079,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.097545722999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3321364593457843,
            "unit": "iter/sec",
            "range": "stddev: 0.009229965931123182",
            "extra": "mean: 750.6738465000069 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0911250775976164,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.973927555000046 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6695249346725787,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4935963519999973 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.057487932947719575,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.394954884000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.488060037382268,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 286.6923130000032 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.2235018456334277,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.474235983000028 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.5774304498462797,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.731810299000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05453502287904513,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.33684020300001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 192.89866705111035,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.184068999994906 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 58.99210107573056,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.9514219999769 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9743fbeb27bc68abed186ea6116b442168b49f1b",
          "message": "Implement a basic set of node and edge errors (#204)\n\n* Implement a new set of basic node and edge errors for one to one matching\n\n* Move statistic helper functions into base Metric class\n\n* Implent and test basic metric class for node/edge errors\n\n* Extend node errors to support many to many\n\n* Expose BasicMetrics in init for module\n\n* Remove many-to-many support\n\n* Add docs for new node/edge errors\n\n* Fix issues that popped up in docs build\n\n* Remove crossref\n\n* Fix tests by removing remaining many to many support\n\n* Improve test coverage\n\n* Add basic metrics to benchmarking\n\n* Remove file that should not have been commited\n\n* Add documentation for basic metrics and consolidate node/edge docs into one page\n\n* Remove unused files from docs\n\n* Add missing underscore",
          "timestamp": "2025-02-14T14:05:34-05:00",
          "tree_id": "3c4aa858a69481fe6ae6541867e01655bdd306fd",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/9743fbeb27bc68abed186ea6116b442168b49f1b"
        },
        "date": 1739560450510,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18366999402535855,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.444547463000049 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05788221818380033,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.276462985999956 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9294945610741828,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0758535250000136 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3524245989610055,
            "unit": "iter/sec",
            "range": "stddev: 0.0011834577496355678",
            "extra": "mean: 739.4127560000356 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10168471671835864,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.834319574000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6822770458498165,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4656802629999675 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05885366627284096,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.991294906999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.86866710800465,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 258.4869599999706 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.15142804588153005,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.603796504000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.5960777917974466,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6776333789999853 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05582984129739918,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.911568020999994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 209.44948089084846,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.7744209999791565 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 65.55974715446592,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.253261999987444 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.734437181181222,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 267.77796799990483 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5418478421848534,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.845536554999967 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d6d83da46b42028ef9d5c29ece12e696387b67f2",
          "message": "Update run metrics to return results and matched object (#208)\n\n* Update run metrics to return results and matched object\n\n* Update notebook with new run metrics output\n\n* Fix calls of run_metrics in cli",
          "timestamp": "2025-02-14T17:22:29-05:00",
          "tree_id": "4d921db82d1ed517885d3f8e1a6b3a314c4b0636",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/d6d83da46b42028ef9d5c29ece12e696387b67f2"
        },
        "date": 1739572130260,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18101246810495408,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.5244813269999895 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06009572363805917,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.640119120999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9062772510772386,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.103415095999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3270258177245242,
            "unit": "iter/sec",
            "range": "stddev: 0.0011190551710612078",
            "extra": "mean: 753.5648415000082 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10300085807450113,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.708656983000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6739719529051937,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.483741268000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.059002108960467224,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.94854671500002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.547388590421314,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 281.8975069999965 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.2356479965088795,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.24361766200002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.5850869549796586,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.709147659999985 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055431455757144074,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.040298353000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 208.39420180487065,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.798598000036236 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 64.68096534259271,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.460499000027994 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.6665973716422564,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 272.73242700005085 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.48231033355816194,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.073353877000045 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ce8d480419acecd3532feaa75c86af5df26e75e8",
          "message": "Add LNK metric (#205)\n\n* Add LNK metric and more tests\n\n* Add docs\n\n* Make consistent behavior when denom is 0 and add docstrings (#206)\n\n* Make consistent behavior when denom is 0 and add docstrings\r\n\r\n* Fix TRA docstrings to not include raises block\n\n* Fix TRA test, add nan test to DET\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>",
          "timestamp": "2025-02-20T11:05:26+11:00",
          "tree_id": "60479ab448164914671787dd1a9b7c3f6423cdf2",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ce8d480419acecd3532feaa75c86af5df26e75e8"
        },
        "date": 1740010306727,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1844826585156298,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.420563688999948 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05919841272413613,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.892344811000044 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9143092961511132,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.093721789999961 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.344422096310122,
            "unit": "iter/sec",
            "range": "stddev: 0.002911959063002711",
            "extra": "mean: 743.8140170000054 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09894880623511523,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.10623612400002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6719623987474064,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4881785079999759 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05828604148136906,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.15676643300003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.623478008338252,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 275.97794100000783 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.2338803505500655,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.27569053000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.5873974538853218,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7024248120000038 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05495084839488546,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.19808118000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 208.72774179487448,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.79093000001285 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 62.30905778664035,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.04903100002275 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.4655483222091057,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 288.5546260000069 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.49922239297909465,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.003115272999935 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "83900323dd31cfce4be4c56ea998933dabfa0375",
          "message": "Add workflow for generating a test case coverage report (#217)\n\n* Add workflow for generating a test case coverage report\n\n* Actually run the report generating step in the workflow\n\n* Try a different way of generating the comment with images\n\n* Add token and change step order\n\n* Try different target commit for comment\n\n* Try a different method for uploading the output plot\n\n* Tweak action message\n\n* Try different commit workflow\n\n* Change git commands\n\n* Add missing stash pop\n\n* Add commit comment\n\n* Get link to raw image\n\n* Add grouping to coverage plots\n\n* Add docstrings\n\n* Fix bad type annotation",
          "timestamp": "2025-02-27T15:01:24-05:00",
          "tree_id": "f15eb2718a779b83f1b562dc24dc97f10f98e109",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/83900323dd31cfce4be4c56ea998933dabfa0375"
        },
        "date": 1740687076304,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17861848663240823,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.598524648000023 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06067592617337513,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.48100100100004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9502011466079189,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0524087489999943 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.340442499706645,
            "unit": "iter/sec",
            "range": "stddev: 0.0028581517725305185",
            "extra": "mean: 746.0223024999948 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10147193745482154,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.854941425999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6776497981997259,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4756884789999845 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.059054823069782714,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.933417932999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.7797415483787646,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.568354000005 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.20890855206374148,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.786783452000009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6009708896263495,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6639741080000476 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055809946733951815,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.91795295499992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 185.3549222386965,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.395055000008142 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 65.38718334036012,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.293517000031898 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.0151413554494955,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 331.65940900005353 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.46090993397788277,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.1696212780000224 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1e93f0c3baac5e288a212abc0ed2751cbfaf482e",
          "message": "Merge pull request #209 from Janelia-Trackathon-2023/point_matcher\n\nPoint matcher",
          "timestamp": "2025-03-04T14:18:24-05:00",
          "tree_id": "4543d2ccac2f1f0db2e269275da503d83a89998f",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/1e93f0c3baac5e288a212abc0ed2751cbfaf482e"
        },
        "date": 1741116464696,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17068981289715737,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.85858044500003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.057631576707137915,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.351598848000037 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8906455943006479,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1227810550000186 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3317362158270363,
            "unit": "iter/sec",
            "range": "stddev: 0.0016335199021002918",
            "extra": "mean: 750.8994559999849 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10081045820871402,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.919605740999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.666612796797734,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5001212170000144 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.0585621724919507,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.07586924200001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.3989607045440597,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 294.2075789999876 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.12112143556728085,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.25617691299999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6244843125637609,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6013212500000122 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05516108935384586,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.128721018999954 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.921290540329961,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 112.09140599999046 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.6363836615640498,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5713791229999288 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 185.8264585265026,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.381365000062033 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 60.16434492424306,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.621140000097512 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.1458171401736346,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 317.88243100004365 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.45727275960647196,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.186878573000058 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6ae081c913f41696e9c90903fd6952ea4032f15c",
          "message": "Replace black with ruff-format in precommit (#221)\n\n* Replace black with ruff-format in precommit\n\n* style(pre-commit.ci): auto fixes [...]\n\n* Fix warnings about ruff config in pyproject.toml\n\n* Bump ruff target version to 3.9 since we still support it\n\n* style(pre-commit.ci): auto fixes [...]\n\n* Run ruff on the scripts directory\n\n* Remove remaining strict=true\n\n---------\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>\nCo-authored-by: Caroline Malin-Mayor <malinmayorc@janelia.hhmi.org>",
          "timestamp": "2025-03-05T16:39:46-05:00",
          "tree_id": "91f4ad62c6a65a722d160e91a2ac0716a25b2216",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/6ae081c913f41696e9c90903fd6952ea4032f15c"
        },
        "date": 1741211330230,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17178698206499277,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.821162860999948 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05715188556991673,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.49723548100002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9137287996107142,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0944166369999948 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.329876849527105,
            "unit": "iter/sec",
            "range": "stddev: 0.0029764408375029224",
            "extra": "mean: 751.9493255000214 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.1036490805476582,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.647938936999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6653271980159237,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5030198719999817 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05901406334140753,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.94511347599996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.759989959623611,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 265.958157 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.1513188904785852,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.608560219000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6367368457154289,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5705075129999955 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055427015890021136,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.041743433999955 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.00671257160993,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 124.89520399992671 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.7063567547689744,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4157152080000515 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 186.49399312038648,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.362103000038587 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 65.65573468079944,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.23096199991869 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.4521019933614467,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 289.6785789999967 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5155332649877972,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.9397390390000737 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d0c028b1046d30a118c6c941fe133a0488883da5",
          "message": "Configure pixi for traccuracy (#220)\n\n* Configure pixi for traccuracy\n\n* Add docs building task\n\n* Add updates to developer notes with pixi\n\n* Update name of test case coverage report task and delete generated jsons\n\n* Add pixi lock\n\n* Add windows and linux to pixi platforms",
          "timestamp": "2025-03-05T17:36:40-05:00",
          "tree_id": "55be5218aa6986876223dfae425780f75e1700b2",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/d0c028b1046d30a118c6c941fe133a0488883da5"
        },
        "date": 1741214646443,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17067745649676413,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.85900458399999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05422445104419987,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.441864891999955 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8968569679843984,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.115004995999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3418334771706213,
            "unit": "iter/sec",
            "range": "stddev: 0.006877567334130425",
            "extra": "mean: 745.2489574999959 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09919620291092561,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.081031033999977 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6228449320107283,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6055360629999882 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05820126802802337,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.18175623799999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.1233530559338893,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 320.168735999971 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.22932309037839385,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.360659881000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6422345070993739,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5570636410000134 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055743993439786386,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.93915251300001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 7.223842140728027,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 138.4304890000294 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.700704666941636,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4271347789999709 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 189.56469122910758,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.275243999903978 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 64.2574327536308,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.562402000000475 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 2.8515971362111725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 350.6806720000668 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5005651052167764,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.9977421309999954 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "74732fa05d97e2d6955b998cd48daa15d6bac6d5",
          "message": "ci(pre-commit.ci): autoupdate (#203)\n\n* ci(pre-commit.ci): autoupdate\n\nupdates:\n- [github.com/crate-ci/typos: dictgen-v0.3.1 → v1.30.0](https://github.com/crate-ci/typos/compare/dictgen-v0.3.1...v1.30.0)\n- [github.com/astral-sh/ruff-pre-commit: v0.8.6 → v0.9.9](https://github.com/astral-sh/ruff-pre-commit/compare/v0.8.6...v0.9.9)\n- [github.com/psf/black: 24.10.0 → 25.1.0](https://github.com/psf/black/compare/24.10.0...25.1.0)\n- [github.com/pre-commit/mirrors-mypy: v1.14.1 → v1.15.0](https://github.com/pre-commit/mirrors-mypy/compare/v1.14.1...v1.15.0)\n\n* style(pre-commit.ci): auto fixes [...]\n\n* style(pre-commit.ci): auto fixes [...]\n\n---------\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2025-03-05T17:37:20-05:00",
          "tree_id": "1573341348de431798c8623868ad8345400f3eea",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/74732fa05d97e2d6955b998cd48daa15d6bac6d5"
        },
        "date": 1741214652552,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18519880583713702,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.399602850999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06022619202129704,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.604071524999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9296544064965422,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0756685419999883 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3435377696096917,
            "unit": "iter/sec",
            "range": "stddev: 0.0027117587484930413",
            "extra": "mean: 744.3036009999986 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10241818108935162,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.763891424000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.663122885799288,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5080161180000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05953367772346243,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.79721526100002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.853850994519764,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 259.48071200002687 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.24862319071711178,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.022150938999971 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6446471700638138,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5512361589999841 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.056029155495406824,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.84785066200004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.568478517718082,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.7068340000128 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.7168811774681558,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.394931310000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 196.91912157481315,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.078227000012703 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 67.46488419050446,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.822525999989011 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.4999624139038223,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 285.7173539999849 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.4808726613925381,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.079552614000022 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1a3c5d6a1a695fb6d7c4e30c61dcfcfba8136722",
          "message": "Merge pull request #227 from Janelia-Trackathon-2023/drop_python_39\n\nDrop python 39",
          "timestamp": "2025-03-13T13:13:12-04:00",
          "tree_id": "1d3da5c6271b789f516c21450f970175a62432c1",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/1a3c5d6a1a695fb6d7c4e30c61dcfcfba8136722"
        },
        "date": 1741886580946,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1765104630910336,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.665386529999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.06064018987148824,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.490713536999976 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9115224582261253,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0970656740000209 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3435315727514638,
            "unit": "iter/sec",
            "range": "stddev: 0.0011133042716138064",
            "extra": "mean: 744.307034000002 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09904084781312612,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.096844100999988 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6378507589082342,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5677648509999926 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.058167061914828684,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.191860256999973 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.7950555253808895,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 263.50075600004175 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.1620178622230417,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.172158960000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6228271472134222,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6055819090000796 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05447834286110114,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.355918103999898 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 10.477907196473014,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 95.438905999913 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.707621607432142,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4131846589999668 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 198.58413483181286,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.035649000092235 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 67.12826297866204,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.896855000074538 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.3777676642909316,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 296.0535180000079 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5264018636588507,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8996893229999614 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cba2029c0e7e662fce0e8a875233fc165d86e0e3",
          "message": "Merge pull request #229 from Janelia-Trackathon-2023/remove_pixi_lock_file\n\nRemove pixi lock file and add to gitignore",
          "timestamp": "2025-03-13T13:30:37-04:00",
          "tree_id": "c961b792a43037da4869442064f8ab596894845a",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/cba2029c0e7e662fce0e8a875233fc165d86e0e3"
        },
        "date": 1741887472796,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18581134391673904,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.381802741000001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.055532645010615216,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.00742607899997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9296991063055792,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.075616823999951 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3575698726008416,
            "unit": "iter/sec",
            "range": "stddev: 0.0015923818438122368",
            "extra": "mean: 736.6103360000125 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10047003477083673,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.953216421999969 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6590066336450852,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5174354080000967 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05922235110743662,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.885516723000023 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.85677336778618,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 259.284096999977 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.23606107580548122,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.2361918269999705 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6464169728080396,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.546989083000085 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055790265705490664,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.92427383800009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 5.883513516130698,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 169.9664660000053 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.7019417127803633,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4246197109999912 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 194.90202567420178,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.130783000026895 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 66.21615841100466,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.102054000067255 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.5217865995250177,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 283.94678999995904 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.45511271903688527,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.197257862000015 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e48b01b1fcaddb59d113b2f94f7dba097a34ff6d",
          "message": "Improve runtime of `TrackOverlap` metrics (#218)\n\nCloses #132.\n\nImprove runtime performance of `TrackOverlap` metrics by leveraging our already computed node matching to avoid checking completely unrelated tracklets.\n\nPrior to this PR, we were maintaining a list of all possibly overlapping mapped edges, and using a set intersect on each reference tracklet to get the actual number of overlapping edges.\n\nIn this PR, I use the knowledge that only edges in a reference tracklet with **both endpoints present in the node matching** could possibly result in an overlapping edge. Rather than keeping a list of all possibly mapped edges, we immediately check whether a proposed overlapping edge of the reference tracklet is present in any of the overlap tracklets (this check is O(1) because I build a dictionary mapping `edge -> tracklet id` in a linear pass over the tracklets). If the edge is present, we increment the overlap count of the given tracklet ID for that reference tracklet. After we've checked all edges of the reference tracklet, I get the maximum count of all tracklet IDs that have any overlap with the reference tracklet.\n\nSince the metric supports `many-to-one` matching, an unhappy path for this metric remains, when many overlap nodes are mapped to both the source and target of a given reference edge e.g. for reference edge `uv` we have 10 nodes mapped to `u` and 10 nodes mapped to `v`. In this case we'd be checking 100 \"possible\" edges for presence in the overlap graph. I think this is highly improbable. We will most of the time have `one-to-one` mapping, or maybe a handful of nodes mapped.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>",
          "timestamp": "2025-03-14T11:29:23+11:00",
          "tree_id": "137b212b05d7654ae25a2ac67749ea3a6eb38803",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/e48b01b1fcaddb59d113b2f94f7dba097a34ff6d"
        },
        "date": 1741912599382,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.18164763674920567,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.505163831999994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05563164897625975,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.975379454000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9239051477547274,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0823621910000156 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3665487398876288,
            "unit": "iter/sec",
            "range": "stddev: 0.0002807666469835449",
            "extra": "mean: 731.770460000007 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10143419850058653,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.858607992000032 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6337652675589771,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.577871258000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.057291663372992685,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.45454645800004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.744585100588737,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 267.05228299999817 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.22694055283821635,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.406440309999994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6195229605180427,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6141451789999905 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.053815153800257615,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.58212658299999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 9.218385025412983,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 108.47887099998843 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.6708993604445611,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4905365230000598 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 197.0376958709997,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.075171000044065 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 63.598311032454355,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.72368799998003 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.1599467596997304,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 316.4610280000488 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.47257972718432373,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.1160450659999697 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 2.2208473992369946,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 450.27857399998084 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2092419995914312,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 826.9643300000098 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "980a59a7ee60a710cfeef244c8f45a811a24b919",
          "message": "Update docs to use exclusively Myst Md (#222)\n\n* First attempt at converting to myst md without building docs\n\n* Initial configuration to get myst md notebooks running in docs build\n\n* Update docs dependencies for myst build\n\n* Add ctc example back in using nsphinx link\n\n* Update copyright year\n\n* Remove remaining unresolved merge conflict\n\n* Fix issue with duplicate autoapi objects by dropping back to the previous pinned version of autoapi\n\n* Reorder toctree\n\n* Fix table wrap issue with custom css\n\n* Update tag for removing cell input contents\n\n* Pin docutils to 0.20.* to address issue that appeared in 0.21.2\n\nAttributeError: module 'docutils.nodes' has no attribute 'reprunicode'\n\n* Suppress a sphinx config warning\n\n* Remove cell input on notebook level instead of cell level for track errors\n\n* Enable dollarmath and colonfence myst extensions\n\n* Remove pixi lock file\n\n---------\n\nCo-authored-by: Caroline Malin-Mayor <malinmayorc@janelia.hhmi.org>",
          "timestamp": "2025-03-14T13:08:39-04:00",
          "tree_id": "6d9066770cc42d39d11032a9e4b012e602a16346",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/980a59a7ee60a710cfeef244c8f45a811a24b919"
        },
        "date": 1741972585938,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17817245110599741,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.612539950999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.051773646478694334,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.31484583400004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8747763575194603,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1431493219999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3293307476972664,
            "unit": "iter/sec",
            "range": "stddev: 0.0009287430377738176",
            "extra": "mean: 752.2582335000152 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.08243845621065041,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.130261118000021 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6369516517147994,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.569977874000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.057838978415457834,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.289378674999966 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.3635793790977098,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 297.30233399999406 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.22164186280596007,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.511783051000009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.5763342501846979,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7351042379999626 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.054010601369133805,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.514883645999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.568063427799828,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.71248799996192 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.689324193639928,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4506962169999724 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 148.5694250052536,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.7308600000615115 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 65.70912266669391,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.21858700004941 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.073047510147186,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 325.40987300001234 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5022960247646647,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.9908578820000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 2.491514927905679,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 401.36223499996504 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2435251247791574,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 804.1654969999854 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ac1e564c17b22ead2a847f281aa0498c90215417",
          "message": "Add tests for correct usage of gap-closing or frame-skip edges (#127)\n\nThis PR adds tests to ensure gap closing edges are loaded and evaluated correctly by existing metrics and matchers, and updates language describing graphs to include definitions and discussion of such edges.",
          "timestamp": "2025-03-21T10:36:49+11:00",
          "tree_id": "fede3c4f585ace60898d4fcde6dafd941296e509",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ac1e564c17b22ead2a847f281aa0498c90215417"
        },
        "date": 1742514377023,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1765130828151181,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.665302446999988 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.058785122459762924,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.01110686100003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9733874347130915,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.027340157000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3425513202341606,
            "unit": "iter/sec",
            "range": "stddev: 0.012552771004587336",
            "extra": "mean: 744.8504835000165 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.1041101051756416,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.605215539000028 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6751382583232548,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4811780960000078 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.058461267045122875,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.105342571999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.7862797587528187,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.1114930000299 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.1689675387288128,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.918296540999904 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.5942027122207963,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.6829273570000396 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055393513654796216,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.052655157999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 9.10778225110705,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 109.79621299998144 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 0.7067318293013238,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4149638640000148 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 197.91226312060834,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.052743999954146 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 62.99636807044183,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.873930999987351 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.5705897761295713,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 280.06577700000435 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5257978995745254,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.901871423999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 2.444912383288065,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 409.0126120000832 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.368772527626112,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 730.5815830000029 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "dd0be059da7547d17597aeea173251a2cf335661",
          "message": "Fully type traccuracy (#231)\n\n* Add library stubs for imported libraries\n\n* Fix existing typing issues in tracking graph\n\n* Fix typing issues in matcher module\n\n* Fix typing issues in track errors\n\n* Fix typing issue in metrics\n\n* Add return types for cli\n\n* Add missing type annotations\n\n* Add additional dependencies to precommit config for mypy\n\n* Correct precommit mypy additional deps to refer the type stubs\n\n* Remove case checking for no matches in iou\nnp.where and np.nonzero always return a tuple of two empty lists\n\n* Add tests for no segmentation in iou matcher\n\n* Improve comment that was entirely giberish",
          "timestamp": "2025-03-21T13:00:36-04:00",
          "tree_id": "f39e68420f43a5c56b27fa0dd2c5031400e18928",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/dd0be059da7547d17597aeea173251a2cf335661"
        },
        "date": 1742576913470,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.183932069991607,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.436789788999988 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.055306443054933284,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.08107599699997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9260856859966,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0798136880000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3461261480551305,
            "unit": "iter/sec",
            "range": "stddev: 0.0007741702025583696",
            "extra": "mean: 742.8724279999983 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10162918531429949,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.839693163999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6644677762351922,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5049638759999766 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.058732568558864086,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.026328398999965 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.776054160095539,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.82671000002256 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.25292459868696043,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.9537475010000094 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.6444085018728836,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5518106869999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.055936678113700865,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.877357642999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 12.98340073515944,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 77.02142299990555 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 1.1172778567217674,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 895.0325060000068 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 204.43459523923846,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.891540000016903 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 67.83977466317143,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.740615000050639 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.5211539007241797,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 283.99781100006294 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.4619386951734014,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.1647894200000337 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 4.182823869570339,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 239.07293999991452 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3235718374974925,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 755.5313369999794 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d8f5b1758ecb731360659855fb0b7d2f809917ee",
          "message": "Update dev docs with instructions to use pixi for building docs (#232)\n\nUpdate dev docs with instructions to use pixi for building docs'",
          "timestamp": "2025-03-21T16:36:59-04:00",
          "tree_id": "3f24a76851a2c57c6f19f0647dc9ef4637a914ea",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/d8f5b1758ecb731360659855fb0b7d2f809917ee"
        },
        "date": 1742589859932,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1799447401579337,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.557261629999971 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.056788080008961454,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.609329279000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9079677801858571,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1013606669999945 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3469650924042182,
            "unit": "iter/sec",
            "range": "stddev: 0.00840896333937653",
            "extra": "mean: 742.4097370000027 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10025174755683375,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.974888462000024 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 0.6538919514575945,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5293046470000036 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.05774249302996067,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.318268532000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.21616904115887,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 237.18214100000523 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.2318434079322092,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.313256127999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 0.5744936823446755,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7406631800000127 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.05443345389777987,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.371055452000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.114032865255338,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 123.24327700002868 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 1.0739161793601788,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 931.1713700000155 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 199.26622206506778,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.018411999969885 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 49.43808426238674,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.227320999993026 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 2.4253114721416544,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 412.3181749999958 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.4315685350551967,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.317129074000036 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7022033103983603,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 270.1094229998944 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2828482120307976,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 779.5154489999732 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ed6fed5910a190ba47ce44e4c057f4333e7f4546",
          "message": "Merge pull request #230 from Janelia-Trackathon-2023/add_python_312\n\nAdd python 312 and 313",
          "timestamp": "2025-03-24T10:59:36-04:00",
          "tree_id": "49cd50a70abf0f20f7ced2b01d9b9b1806358f51",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/ed6fed5910a190ba47ce44e4c057f4333e7f4546"
        },
        "date": 1742829510896,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1545701969369324,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.469552474000011 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.052771828990239175,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.949504293000018 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8778741866427727,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1391153939999867 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2506787105059343,
            "unit": "iter/sec",
            "range": "stddev: 0.0018799819706514633",
            "extra": "mean: 799.5658609999623 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10137949933509047,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.86392719000014 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.4399641617109922,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 694.4617280000784 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.10076302927859727,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.924274877000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 2.79288165071297,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 358.05312399998 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.11874994406728946,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 8.421056598000177 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.2787431963542506,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 782.017845999917 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.09290124532451835,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.764118354999937 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.584660330791428,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 218.11866699999882 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 1.021342322556557,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 979.1036540000277 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 185.98831025812754,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.37668200013286 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 61.14858942070023,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.353607000155534 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 4.22273564025249,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 236.81330899989916 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.48687816981545917,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.0539019039999857 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6544855791895348,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.6363239998809 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2718677371105027,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 786.2452760000451 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "dcf398c7dc1f1c4ea55fde50f75908db0ab9b83c",
          "message": "CTC loader checks dimensionality of data to set TrackingGraph loc keys (#236)\n\nCtc loader checks dimensionality of data to set TrackingGraph location keys correctly",
          "timestamp": "2025-03-26T15:30:24-04:00",
          "tree_id": "3ef49ba022f1aae641fff717658fd00c2c3c6ab2",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/dcf398c7dc1f1c4ea55fde50f75908db0ab9b83c"
        },
        "date": 1743017967203,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15359040467415438,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.5108233949999885 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.0521772128601819,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.165454519000036 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8717227934627596,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1471536679999872 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2359950925605716,
            "unit": "iter/sec",
            "range": "stddev: 0.000615530796161575",
            "extra": "mean: 809.0647010000112 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.096586907363079,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.353370112999983 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.451029943520617,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 689.1656540000213 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.10064592250283559,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.935822288000054 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.0200610879842564,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 331.11912999993365 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.12707470678717656,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.8693866410000055 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.2856480654720128,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 777.8178390000221 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.09207641356518965,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.860544642000036 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 5.711359474781396,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 175.08966200000486 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.8593637167713855,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 349.7281560000829 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 165.58246031302227,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.039287000021432 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 62.15499317157178,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.08881200002088 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 4.135548559217907,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 241.80589000002328 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5475888826423909,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8261875500000997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.601012055795988,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 277.6997089999895 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1224383700294964,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 890.9175119999873 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5fd8fc55196bec2785e5220976afd75b6746b650",
          "message": "Implement a point to segmentation matcher (#234)\n\n* Implement a point to segmentation matcher\n\n* Change behavior to fail if both datasets have segmentations\n\n* Add docs\n\n* Eliminate use of unpack operator in subscript for 3.10 compatibility\n\n* Add test to cover empty data case\n\n* Introduce benchmarking function for PointSegMatcher\n\nCurrently failing because the ctc loader doesnt set the location keys for 3D data\n\n* Correctly unpack the regionprops centroid coordinate\n\n* Set location keys in copied data in benchmarking\n\n* Improve documentation and comments",
          "timestamp": "2025-03-27T11:46:50-04:00",
          "tree_id": "ac1bb7cd7a656cda5ed6d8504dec0c22a18da438",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/5fd8fc55196bec2785e5220976afd75b6746b650"
        },
        "date": 1743090871217,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1573574393932246,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.354958519000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05635013951561147,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.746184989 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8716907557099355,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1471958300000153 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2301395484512005,
            "unit": "iter/sec",
            "range": "stddev: 0.00007403054445953579",
            "extra": "mean: 812.9159014999914 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0977231135189576,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.232993649000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.4400470897702822,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 694.4217359999811 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.1008102702896816,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.919624232000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.375707371383474,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 228.53447800002868 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.23880394058664126,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.187535588999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.2897637202004744,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 775.3358109999908 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.09156808334642691,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.920835769999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 7.718129227971552,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 129.56507600000577 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.8434342463124564,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 351.6874009999924 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 46.93610273857968,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 21.30556100001968 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 15.251738019426858,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 65.56629800002156 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 157.23621502250566,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.359857999996166 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 60.42316152709226,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.549945000008393 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.8623079640685716,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 258.9125490000015 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.4947634376295025,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.0211679440000125 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.647111142411275,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 274.1896150000116 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1279590417858845,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 886.5570140000045 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "62d040f6708abcd21f101bc9a19c28258c94d506",
          "message": "ci(pre-commit.ci): autoupdate (#238)\n\n* ci(pre-commit.ci): autoupdate\n\nupdates:\n- [github.com/crate-ci/typos: v1.30.0 → v1](https://github.com/crate-ci/typos/compare/v1.30.0...v1)\n- [github.com/astral-sh/ruff-pre-commit: v0.9.9 → v0.11.4](https://github.com/astral-sh/ruff-pre-commit/compare/v0.9.9...v0.11.4)\n- [github.com/abravalheri/validate-pyproject: v0.23 → v0.24.1](https://github.com/abravalheri/validate-pyproject/compare/v0.23...v0.24.1)\n\n* style(pre-commit.ci): auto fixes [...]\n\n---------\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2025-04-11T15:11:34-04:00",
          "tree_id": "053ca2cff71a46940aeea56de3e0980586c39006",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/62d040f6708abcd21f101bc9a19c28258c94d506"
        },
        "date": 1744399250123,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16458513563383367,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.075882831999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05383136740681609,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.576529785000048 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9156936882495923,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0920682459999966 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.231576924684852,
            "unit": "iter/sec",
            "range": "stddev: 0.000013984450835626281",
            "extra": "mean: 811.9671454999775 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10054632164609188,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.945664680999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.4337845277843553,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 697.4548689999551 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.10099891011662006,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.901096940999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.357930574261705,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 229.46671199997581 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.1406255369456529,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.111083959000041 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.2742332241048222,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 784.7856899999783 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.09087709936118736,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 11.003872339999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.5779988891240677,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 279.48583300002383 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.8167408383533514,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 355.0202370000761 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 46.37029770986165,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 21.565528999985872 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.317338012850836,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.84538599999723 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 141.71397669715907,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.056466999983968 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 55.13559082318834,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.137105000050724 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.850662542494529,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 259.69556899997315 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5290497932253744,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8901812509999445 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.4709284095541793,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 288.1073539999761 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.0931901187520254,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 914.753969000003 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "af1b861c74b1d97ef0bd72f799c077b3ee7f183d",
          "message": "Limit CLI to CTC only (#242)\n\nLimit cli to just running standard ctc metrics on ctc data, also add tests for cli",
          "timestamp": "2025-04-17T15:00:32-04:00",
          "tree_id": "03d8811613baf855205e856cbaed647e6e656c86",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/af1b861c74b1d97ef0bd72f799c077b3ee7f183d"
        },
        "date": 1744916891161,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1688119459254954,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.923751393999964 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05108899922663377,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.573685434000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8887583417436152,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1251652479999734 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2538397392261773,
            "unit": "iter/sec",
            "range": "stddev: 0.00023720250530184198",
            "extra": "mean: 797.5500924999892 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10468457546938052,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.55250566299992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.4110620872708732,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 708.6860379999962 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.10169114463277283,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.83369794500004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.420018577072795,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 226.2433930000043 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.23389726551129947,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.275381321000054 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.2509673370765002,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 799.3813829999681 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.09175878654008915,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.898138889000052 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.657995354935537,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 214.68462799998633 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.83014542874935,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 353.33873299998686 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 51.16730793825447,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.543728999906307 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.804974880184405,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.54486299996643 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 174.88032938787802,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.718196000088938 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 62.74444844953715,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.937665000024026 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 4.207390507785245,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 237.67701099995975 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5455129131542179,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.833137173999944 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.717028866721111,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 269.0320780000093 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1294380850247077,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 885.3960330000064 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c203772b3c326121c3fdf61f004a70f58f0e89c4",
          "message": "Merge pull request #243 from Janelia-Trackathon-2023/deterministic-point-matcher\n\nSort nodes to ensure point matcher is deterministic",
          "timestamp": "2025-04-22T11:48:51-04:00",
          "tree_id": "4fac365d79f92b47fe1cdebcaa719a4d1cf72ec0",
          "url": "https://github.com/Janelia-Trackathon-2023/traccuracy/commit/c203772b3c326121c3fdf61f004a70f58f0e89c4"
        },
        "date": 1745337377828,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1669402546161922,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.9901669749999655 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05244725162680487,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.066776027000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9054971612560051,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.104365692999977 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2429033079791523,
            "unit": "iter/sec",
            "range": "stddev: 0.0015513866210706295",
            "extra": "mean: 804.5678160000307 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09476621875624089,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.552283430999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.3880735768832768,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 720.4229059999534 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.10117287100103133,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.88407257900002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.4133892485036945,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 226.58323199999586 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.2398937964830194,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 4.168511293999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.2393637861837545,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 806.8655960000228 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.0907508472871635,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 11.019180866 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.709213750472663,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 212.34967300000562 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.8886299469656147,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 346.1848759999384 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 51.10877157870821,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.56611299999622 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 15.690580497355317,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 63.73250499996175 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 163.39506180776058,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.12013600004957 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 61.367708250499106,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.29521500001374 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 4.1593290383350485,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 240.42339300001458 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.4889756881151072,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.0450914519999515 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7740773016928904,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.9654260000034 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.129446728762321,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 885.3892570000426 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "85d8af28d328f28063756e02b294eff4d7a81735",
          "message": "Merge pull request #244 from live-image-tracking-tools/point-loader\n\nLoad csv into TrackingGraph",
          "timestamp": "2025-05-13T11:20:43-04:00",
          "tree_id": "91ad6d6555581f6dbd4f4f9804f6c3b464cde1d4",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/85d8af28d328f28063756e02b294eff4d7a81735"
        },
        "date": 1747150261021,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1612824873733565,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.200301199999956 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.0543386808101932,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.403096746000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8808693944144759,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1352420760000541 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.741044119873829,
            "unit": "iter/sec",
            "range": "stddev: 0.023571576372541887",
            "extra": "mean: 93.10081858333774 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2238506973377064,
            "unit": "iter/sec",
            "range": "stddev: 0.006284866187480915",
            "extra": "mean: 817.0931325000197 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09748848422861281,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.257621788999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.269126926239242,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 787.9432540000266 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07745770663190751,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.910271211000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.364081169831485,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 229.14330900005098 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.3288665183184022,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.040747367999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1387770322934827,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 878.1350269999848 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07156678216443871,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.972963011000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.645270837197252,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 215.2727010000035 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.857351011082096,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 349.97450299999855 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 50.97362945544873,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.617987000003723 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.735900900003703,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.86147700000811 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 168.72610943668644,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.926765000026535 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 59.66500961053346,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.760241999918435 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 4.011405854906323,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 249.28916099997878 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5832556882947143,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.714513925999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.597131954894295,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 277.9992539999512 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.0705379144705076,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 934.1098400000192 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7df255f4d1915f6fd03878f87f86bde6ab31a4b9",
          "message": "Merge pull request #248 from live-image-tracking-tools/fix-docs\n\nPin click dependency to avoid docs build failure",
          "timestamp": "2025-05-13T11:39:45-04:00",
          "tree_id": "a21caec86216f50ed581b9f12e96589412b814c0",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/7df255f4d1915f6fd03878f87f86bde6ab31a4b9"
        },
        "date": 1747151284172,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16698033669661666,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.988729090999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05423699751941986,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.437598793000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8907034656171708,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1227081050000152 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.766778904504672,
            "unit": "iter/sec",
            "range": "stddev: 0.02367742256579889",
            "extra": "mean: 92.87828875000059 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2453689453540437,
            "unit": "iter/sec",
            "range": "stddev: 0.0016369175502263618",
            "extra": "mean: 802.9748965000181 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10016604842371908,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.983422684000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2670662563680934,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 789.2247110000312 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07766578926190335,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.875681937999957 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.306422382157611,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 232.2113140000397 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.3033287957539545,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.2967526130000238 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.133855898868356,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 881.9462870000052 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07165299338412899,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.956151065999961 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.32840251241548,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 231.0321180000301 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.8209700657644103,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 354.4879869999704 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 42.64602189803543,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.44884600000796 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 15.200130234733452,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 65.78890999992382 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 162.13709664233355,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.167620000042007 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 60.635882435745714,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.4918849999367 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.9429426391458815,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 253.6176890000661 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5431702207717536,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8410434919999261 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6219081793604673,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 276.097557000071 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1198599221872314,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 892.9688260000148 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a6bc3c55c8a6313e8bf8c8aa3e72d67b6cec2df4",
          "message": "Merge pull request #237 from live-image-tracking-tools/224-store-position-as-list\n\nAllow positions stored as lists in a single attribute",
          "timestamp": "2025-05-15T11:06:00-04:00",
          "tree_id": "51b50337fd1ca56dd94fe96406dd47bf9b2d26ff",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/a6bc3c55c8a6313e8bf8c8aa3e72d67b6cec2df4"
        },
        "date": 1747322049156,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16060958223396662,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.226278570000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05329596182969478,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.763147632 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.821120492796835,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2178480610000122 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.277074994753761,
            "unit": "iter/sec",
            "range": "stddev: 0.027603026744797456",
            "extra": "mean: 97.30395083333339 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2042193647636923,
            "unit": "iter/sec",
            "range": "stddev: 0.0019530352936042482",
            "extra": "mean: 830.4134854999887 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09703837486442755,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.305201435999948 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2149269541205407,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 823.0947520000313 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.076493878075722,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.072941588999981 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.969794910311958,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 251.9021819999807 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.2926822393543797,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.416674692000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1382320766536422,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 878.5554549999688 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07070007287813015,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.144256989999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.31625662940854,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 231.6822390000084 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.6187370879563354,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 381.86345800005483 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 41.27343402399331,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.228660000005675 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.74510931828321,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 72.75315000003957 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 154.9189316971718,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.4549890000193955 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 56.1498329092445,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.80949200002624 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.700363399367796,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 270.2437280000254 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5341772490580713,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8720377959999723 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.5213305017697794,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 283.9835680000533 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.0871184291228273,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 919.8629819999269 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fefb1b56884b0d622e1de41b06d5cf2fe543a243",
          "message": "Document branching correctness = division F1 score (#246)\n\n* Document branching correctness = division F1 score\n\n* Correct code snippets in docs\n\n* Fix cli test for running on windows",
          "timestamp": "2025-05-27T10:35:34-04:00",
          "tree_id": "c55f5cfcb3617f2ef151d528363fda5cea7dd603",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/fefb1b56884b0d622e1de41b06d5cf2fe543a243"
        },
        "date": 1748357187862,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1574961277454741,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.349362452999969 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05317883693684311,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.804472936999957 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8736930020115722,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1445667959999923 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.283023477015277,
            "unit": "iter/sec",
            "range": "stddev: 0.03019092628409734",
            "extra": "mean: 97.24766283333015 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2238197421216186,
            "unit": "iter/sec",
            "range": "stddev: 0.0006188626833289443",
            "extra": "mean: 817.1137999999871 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0954615031210734,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.475426923999976 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2041279538827316,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 830.476525999984 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07620423418129676,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.122630399000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 3.9862415510666587,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 250.86287099998117 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.31713193036672194,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.1532617950000486 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.0946614798014813,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 913.5244260000377 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07066157017105176,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.151964039000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.953322613872318,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 252.9517820000251 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.6674274240813016,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 374.8930489999793 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 37.97377553851869,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 26.333962999956384 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.448526236532288,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.35758999997688 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 165.73619604159146,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.033684999920297 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 57.24727945158146,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.46807900008207 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 3.7407653222803305,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 267.32497599994076 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5548593414812596,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8022585639999988 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.3688519138975463,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 296.8370309999955 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.0129608164258848,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 987.2050169999511 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f5650dccf6d675b901819d1eb8221d38c350c837",
          "message": "Remove graph copying in division metrics with frame buffer (#245)\n\n* Use min_buffer_correct for annotating div\n\n* comment old return\n\n* Update docstrings and get tests passing\n\n* Add util for marking divs correct\n\n* Tidying up\n\n* Update docs\n\n* Use full path to imports\n\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>\n\n* Fix typing import\n\n* See what happens when I remove\n\n* Bring back imported members because it broke subclasses\n\n* Check if importing function in init fixes docs\n\n* Try declaring\n\n* Try specifying all exports\n\n* Define all everywhere\n\n* Try turning off imported members again... why do we need it?\n\n* Use full path in docstring\n\n* Revert trying random stuff\n\n* Review comments\n\n* Exclude min buffer flag from tracked sets\n\n* Fix tests\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>",
          "timestamp": "2025-06-05T12:51:24-04:00",
          "tree_id": "69091b78e615b1eedf72ef17d5ac2cec2226c6c1",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/f5650dccf6d675b901819d1eb8221d38c350c837"
        },
        "date": 1749142798524,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16642212048316174,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.008816598999999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.0546426576379085,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.300720412000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8784409935930545,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.138380388999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.795847960057639,
            "unit": "iter/sec",
            "range": "stddev: 0.024865969570843808",
            "extra": "mean: 92.62820333333603 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2423894182676798,
            "unit": "iter/sec",
            "range": "stddev: 0.0004109471266867648",
            "extra": "mean: 804.9006094999953 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09842554027415369,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.159964550000012 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.263448914633943,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 791.4843160000089 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07737704182539876,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.923730042000045 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 4.41962766546182,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 226.263404000008 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 0.30997306124555946,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.226086796000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1458535932184575,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 872.7118420000011 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07153237406459254,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.979684206999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.76018323030688,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 210.07594699995025 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.8417950931889204,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 351.8902550000007 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 45.225987702754246,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.111181000013858 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 15.015958359902674,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 66.5958160000173 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 169.88118679728348,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.886466999982076 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 63.92084451703146,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 15.64434900001288 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 4.045796719631456,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 247.17010500000924 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 0.5833913007459263,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.714115377999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6822453100555914,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 271.5734330000146 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1261331885538424,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 887.9944309999246 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0e639d46ccdd0e13ebc3fa6bd0672e26f3d0e313",
          "message": "Merge pull request #252 from live-image-tracking-tools/remove-get-subgraph\n\nRemove get subgraph",
          "timestamp": "2025-06-06T14:40:10-04:00",
          "tree_id": "f2591ea904c120fe59cdf2c671cc248d9cf0ac0b",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/0e639d46ccdd0e13ebc3fa6bd0672e26f3d0e313"
        },
        "date": 1749235684899,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1602648045878528,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.2396731620000025 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.049444602349407986,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.224654512 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8628999441144609,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1588829119999957 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.456935590371275,
            "unit": "iter/sec",
            "range": "stddev: 0.02728949274005679",
            "extra": "mean: 95.63031075000576 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2200116671545633,
            "unit": "iter/sec",
            "range": "stddev: 0.0013886339745566277",
            "extra": "mean: 819.6642925000077 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09228357783646104,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.836164174000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2536183987023308,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 797.6909090000106 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07707225181977646,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.97483823799999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.82342604792509,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 113.3346609999819 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.936105858947894,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 340.587174999996 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1333656099991716,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 882.3278130000176 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07150216548183597,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.985590411999965 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.8003640442478925,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 208.31753400000252 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.171643553220008,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 460.48072600001433 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 42.54836451317671,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.50266600001305 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.043770218644736,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 71.2059499999782 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 136.565231475044,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.3225080000156595 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 57.727958036929564,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.322628999977496 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.962968253374779,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 71.61801000000878 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.547971744453071,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 219.8782349999533 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7018743059749504,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 270.1334289999977 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1158230520886152,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 896.1994449999793 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "99a297a6db292009882b8bdc0c504ac26f6116f3",
          "message": "Move TrackGraph node attr validation into a separate function with flag (#255)\n\n* Move trackgraph node attr validation into a separate function with flag\n\n* Fix project urls in pyproject\n\n* Improve docstring",
          "timestamp": "2025-06-13T13:00:21-04:00",
          "tree_id": "faeadc71b48cbad1cd9469772ea4d23863d4fc61",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/99a297a6db292009882b8bdc0c504ac26f6116f3"
        },
        "date": 1749834639442,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16097826372384993,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.212018795999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05339402615770125,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.728686933000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8784980290382572,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1383064810000292 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.808323387161789,
            "unit": "iter/sec",
            "range": "stddev: 0.027557993496848163",
            "extra": "mean: 92.52128791666318 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2443733574317986,
            "unit": "iter/sec",
            "range": "stddev: 0.006067135988747881",
            "extra": "mean: 803.6173340000232 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10137929039806744,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.863947519000021 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2626934930832345,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 791.9578309999906 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07753548172259775,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.897321042999977 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.804543087884609,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 113.57772799999566 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.835326719234222,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 352.69304000001966 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.134239807125337,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 881.6477729999974 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07198456980800576,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.891866030000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.435460255625912,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 118.54717699998218 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.1905426383965785,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 456.5078910000011 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 42.212796479993784,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.689498999999614 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.154992525313563,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.64645200000541 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 151.1785044719646,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.614697000031811 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 54.71246085032844,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.277372000056857 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.208335538975145,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 81.91124799998306 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.165098940780096,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 240.09033499999077 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.567300364044951,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 280.3240259999029 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1060386825305613,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 904.1275099999666 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f3c1ceb0feed45b77cc06716971a2b89e010b6ec",
          "message": "Merge pull request #258 from live-image-tracking-tools/readme-links\n\nUpdate links throughout repo to point to new litt org",
          "timestamp": "2025-06-24T14:51:15-04:00",
          "tree_id": "cdf041730cc7efbc05f898f242521cb239592bb7",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/f3c1ceb0feed45b77cc06716971a2b89e010b6ec"
        },
        "date": 1750791651055,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15767896132474674,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.342000172999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05408073601879416,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.49087260300007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8744061449898538,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1436333170000808 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.413522305580566,
            "unit": "iter/sec",
            "range": "stddev: 0.028946094405851316",
            "extra": "mean: 96.02898718180147 msec\nrounds: 11"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.216232030684094,
            "unit": "iter/sec",
            "range": "stddev: 0.0015120276434003183",
            "extra": "mean: 822.2115309999936 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09093403833183863,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.996982189999926 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.249083436626449,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 800.5870309999636 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.0771597759197457,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.960120581999945 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.885909779029175,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 112.53771700000925 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.7927501691345697,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 358.06998100008514 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1306167486889238,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 884.4730110000683 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07136718725169491,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.012041647000046 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.667617556311308,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 115.37195700009306 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.269190718363662,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 440.6857440000067 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 43.883696618691545,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.787505999986024 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.50824127587116,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 68.92634200005432 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 137.3722798402724,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.279488999984096 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 59.116297659742436,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.915809000010995 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.082913461208475,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 76.43557400001555 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.387683132844229,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 227.91071500000726 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6211939545050393,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 276.1520130000008 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1175347480274576,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 894.8267620000934 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d27970ee277c1630f955075836587a8467079717",
          "message": "Address impact of sparse annotations on metrics (#257)\n\n* Add general warning to matcher docs about sparse GT annotatations\n\n* Add docstring warning about sparse annotations and expand CTC metric docstrings\n\n* Add warning about sparse metrics to metric homepages in the docs\n\n* Call out Precision and F1 Score as invalid with sparse GT\n\n---------\n\nCo-authored-by: Caroline Malin-Mayor <malinmayorc@janelia.hhmi.org>\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>",
          "timestamp": "2025-06-24T14:58:00-04:00",
          "tree_id": "510fe00df493179d6e5389e11ba71e3dc5fa1b2b",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/d27970ee277c1630f955075836587a8467079717"
        },
        "date": 1750791973887,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16508467295723708,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.057497538000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.054736407117455727,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.269375953999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.885545887044581,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1292469589999428 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.644229218086366,
            "unit": "iter/sec",
            "range": "stddev: 0.026856070245809348",
            "extra": "mean: 93.94761983336745 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2371456484545897,
            "unit": "iter/sec",
            "range": "stddev: 0.0022156795008779853",
            "extra": "mean: 808.3122639999374 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09998299124347027,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.001701164999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2739742688536708,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 784.9452100000462 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07775304202714087,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.861233129000084 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.064705006485786,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 110.31798600004095 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.878957449817197,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 347.34796100008225 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1520634982008573,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 868.0077110000184 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07255464496963299,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.782715089000021 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 7.005230287074052,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 142.75048199988305 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.2907550463779,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 436.5372900001603 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 45.76932817027831,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 21.848692999810737 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.743128916842748,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.82820700004777 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 153.77492057259704,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.503010999949765 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 57.68529671043469,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.335439999897062 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.404609754113064,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.60120200016718 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.425245683221056,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 225.97615400013638 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.563779707410249,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 280.6009579999227 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.078906210278542,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 926.8646250000074 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8400b42b35c79ebfe67493f4cd9093b3e211615c",
          "message": "Show track errors in autodocs by fixing public/private (#256)\n\n* Make error submodules private and expose evaluate_division function as public\n\n* Fix issue where track error docs were not appearning in autodocs\n\n* Add docstring for classify basic errors\n\n---------\n\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2025-06-30T10:24:23-04:00",
          "tree_id": "40f6f2d9f2cc14dd78e1178adaf91ca9a0a63b98",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/8400b42b35c79ebfe67493f4cd9093b3e211615c"
        },
        "date": 1751294196812,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15443217672433573,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.475334487999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.053242330000997824,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.782048042999975 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8490836698375048,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.177740233999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.039736742575222,
            "unit": "iter/sec",
            "range": "stddev: 0.030376430030768623",
            "extra": "mean: 99.604205333326 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1719069461376068,
            "unit": "iter/sec",
            "range": "stddev: 0.008524467110730967",
            "extra": "mean: 853.3100714999762 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09727850100335976,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.279763664999962 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2537459609884094,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 797.6097480000135 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07706224846285853,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.976522485999965 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.371871079116774,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 119.44761099994139 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.6152127600980437,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 382.37806699999055 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1165121119144934,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 895.6463519999716 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07172353987582218,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.942423948000055 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 6.2774738350509445,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 159.2997479999667 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.126564484250763,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 470.2420300000085 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 43.67273556113606,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.897580999938327 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.774297447463887,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 72.59898400002385 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 142.25900470883656,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.029432000081215 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 56.953926323858695,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.55805200002669 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.198231012536732,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 81.9791000000123 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.217156413685642,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 237.12660900002902 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.4920461681885957,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 286.3650570000118 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.0735845788713938,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 931.4589829999704 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6077e549ed939808f112714b70ccf0ddd37d8e74",
          "message": "Add function to expand skip edges (#249)\n\n# Proposed Change\n\nThis PR adds a function that checks whether a given skip edge is equivalent to multiple edges connecting the matched source and target vertex. A skip edge `u -> v` is considered equivalent to a path of edges `u' -> ... -> v'` if `(u, u')` and `(v, v')` are matched vertices, and no other nodes on the path have a matching node in the other graph. \n\nThis PR also adds `SKIP_TRUE_POS`, `SKIP_FALSE_NEG` and `SKIP_FALSE_POS` annotations to edges for basic edge errors. The user can relax edge checks by toggling `relax_skips_gt` to check the presence of edges in pred equivalent to a gt skip edge, or `relax_skips_pred` to check the presence of edges in gt equivalent to a pred skip edge, when calling `Metrics.compute`.\n\nThis PR does not update the values e.g. precision or recall reported by the `BasicMetrics`, and does not change graph annotations for anything except the `BasicMetrics`.\n\n# Types of Changes\n- New feature or enhancement\n- Documentation update\n\nWhich topics does your change affect? Delete those that do not apply.\n- Track Errors\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after creating the PR. If you're unsure about any of them, don't hesitate to ask. We're here to help! This is simply a reminder of what we are going to look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various situations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes did not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly in the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric descriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion by explaining why you chose the solution you did and what alternatives you considered, etc...",
          "timestamp": "2025-07-01T07:42:12+10:00",
          "tree_id": "af6fc4e1a0a76fb0bf0ee1167b9b737ba14d439d",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/6077e549ed939808f112714b70ccf0ddd37d8e74"
        },
        "date": 1751320243425,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1658131682275543,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.0308841010000265 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05392746144294525,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.543428027999994 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8776356210610275,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1394250370000236 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.694080575382774,
            "unit": "iter/sec",
            "range": "stddev: 0.024853964942382224",
            "extra": "mean: 93.50967509090485 msec\nrounds: 11"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2200714312292533,
            "unit": "iter/sec",
            "range": "stddev: 0.00044142413609482665",
            "extra": "mean: 819.6241420000092 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09652104028427878,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.360435373000001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.280732639725469,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 780.8030879999706 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07704653281423803,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.979169385999967 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.759778551746733,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 114.15813700000399 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.512195673715115,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 398.058165000009 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.0916445048186367,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 916.0491309999657 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.0717029737719346,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.946422964000021 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 6.371478327031477,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 156.94944699998814 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.098381839349554,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 476.5576890000034 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 41.226676677623885,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.256138999987797 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 12.623600672286395,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 79.2167010000071 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 143.61287483652592,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.963164000012512 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 61.493376486773286,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.26191400004018 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.646798024236848,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 79.0713979999964 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.693132536344276,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 213.07729799997333 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7453551463159265,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 266.99737700005244 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1317332449602824,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 883.6004460000595 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0173592f6df4fa22810298bc717ead0d732dd3eb",
          "message": "Incorporate skip edge errors into basic metrics  (#264)\n\n# Proposed Change\n- Closes #261\n- In order to count errors when skip errors are involved, I added a new\nfunction to look at each edge individually and count it for only one\nerror class. If we are counting skip errors, the skip flag takes\nprecedent over any non-skip error flag.\n- I added a new test case graph that contains all of the basic errors so\nthat it was easy to test that the counts were working correctly.\n- I changed the way that we compute the total number of edges in\ngt/pred. Previously we added tp + fn or tp + fp, but that leads to weird\ncounts with skip edges. Instead I am now just counting the number of\nedges in the graph. I don't think this is exactly what we discussed at\nour last meeting, but this feels more correct to me.\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- New feature or enhancement\n\nWhich topics does your change affect? Delete those that do not apply.\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.",
          "timestamp": "2025-07-15T14:51:50-04:00",
          "tree_id": "bd28921c35bd7ce51acdafdaac2aae652c79b269",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/0173592f6df4fa22810298bc717ead0d732dd3eb"
        },
        "date": 1752606138825,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.162967987485722,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.136174444000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05329586695567426,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.763181033000023 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8729258970796514,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1455726120000236 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.506937098837849,
            "unit": "iter/sec",
            "range": "stddev: 0.030287409889472455",
            "extra": "mean: 95.17521524999022 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.19221253662069,
            "unit": "iter/sec",
            "range": "stddev: 0.03233746317866172",
            "extra": "mean: 838.7766184999919 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09908993627500905,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.091842195000027 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2722414976138812,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 786.0142920000044 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07712097233988668,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.966641493999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.217117544288929,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 121.69717599999785 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.8517314034838233,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 350.6641609999974 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1378880986688282,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 878.8210380000123 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07174314365203677,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.938614187999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.728869926367995,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 114.5623670000191 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.1655759714413203,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 461.77091599997766 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 44.09240674960283,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.679642000014155 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.727837226520933,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.89863200003765 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 153.68743019658032,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.506713000021591 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 55.12546362564973,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.14043700005641 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.480663863486223,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 80.1239429999896 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.164565365801016,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 240.1210960000526 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.39780343696231,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 294.30778400001145 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.087795007136868,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 919.2908530000068 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bd3c77f956e99547dee3aadcf8fd8805613685cc",
          "message": "Merge pull request #268 from live-image-tracking-tools/larger_example_test_case\n\nAdd a larger test case with multiple tracks and frames",
          "timestamp": "2025-07-16T20:41:31-04:00",
          "tree_id": "cdba5f04765cac2e68ce4c600ba4b1d6a1707cb7",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/bd3c77f956e99547dee3aadcf8fd8805613685cc"
        },
        "date": 1752713372327,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16626486821505737,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.014499699999988 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.052683555619994465,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.981254933000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8737708871358956,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.14446477300001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.353404060519864,
            "unit": "iter/sec",
            "range": "stddev: 0.028310451790269177",
            "extra": "mean: 96.58659066666313 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2208073406969708,
            "unit": "iter/sec",
            "range": "stddev: 0.00901322426762643",
            "extra": "mean: 819.1300679999927 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09691827387693211,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.317971626999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2651743637308857,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 790.404886999994 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07693377165829635,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.998192841000048 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.15165568482481,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 122.67446499998869 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.6481122059587894,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 377.62750299998515 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.145279305185268,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 873.1494539999858 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.0716879717376933,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.949341511 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 10.073755910534182,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 99.26784100002806 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.185411061178458,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 457.5798199999781 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 40.900061476919504,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.449840999977823 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.273414680381975,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.06031999998186 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 142.71275832135007,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.007081999972797 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 57.078218506479665,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.519818000039322 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.24078006084278,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 81.69414000002462 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 3.500087059415656,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 285.707178999985 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.400720537866215,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 294.05532999999195 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.075059646432365,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 930.1809470000535 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "564f8f772a48ef0d156a2e8cfee374ff1a2b8191",
          "message": "Merge pull request #267 from live-image-tracking-tools/docs-maintenance\n\nUpdate some docstrings",
          "timestamp": "2025-07-16T20:47:33-04:00",
          "tree_id": "d93bd0189554831d5c918536bfdeab94741c5ba1",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/564f8f772a48ef0d156a2e8cfee374ff1a2b8191"
        },
        "date": 1752713724312,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16506682322458113,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.058152574000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05303420808167396,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.855754355000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8569236494627789,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1669651089999888 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.367895402698531,
            "unit": "iter/sec",
            "range": "stddev: 0.030700537350321428",
            "extra": "mean: 96.4515903333402 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.23466497638727,
            "unit": "iter/sec",
            "range": "stddev: 0.007541340490403069",
            "extra": "mean: 809.936313999998 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.08823648479893938,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 11.333180398999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2329885403357232,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 811.0375459999943 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07625728965536899,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.113500420999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.539370627378052,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 117.10464899999806 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.71947201820609,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 367.7184370000077 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.126286486237913,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 887.8735670000424 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.0693854700666054,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.412239321000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 6.772867578221269,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 147.64794799998526 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.063135260622748,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 484.6991950000188 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 40.73451333885128,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.549207000006845 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.404488648510437,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.6018760000311 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 133.41774229196642,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.495254999980716 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 53.817258118285885,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.5814000000164 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.30183421209269,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 81.28869099999747 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.130799400190233,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 242.0838929999718 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.4932175879439082,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 286.269027000003 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.082685813413849,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 923.6289859999829 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ed80104899cfbaaadc28418fa05c5b89af16ee6e",
          "message": "Add TF measure to track_overlap (#259)\n\n# Proposed Change\nCloses #40\n\nThis PR adds an additional result to the `TrackOverlap` metrics\nrepresenting track fractions (TF): the **unweighted** track\neffectiveness.\n\nThis is calculated as the average fraction of maximally overlapping\npredicted tracklets onto the GT tracklets. Unlike track effectiveness,\nthis metric does not take into account the tracklet length when\ncomputing fractions.\n\nUnlike track purity/track effectiveness, it's not trivial to \"invert\"\nthe track fractions number, so I only test the \"forward\" direction in\nthis case. I also got a couple of floating point errors in the tests, so\nI changed the assertion to `np.allclose`.\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- New feature or enhancement\n\nWhich topics does your change affect? Delete those that do not apply.\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>",
          "timestamp": "2025-07-25T11:53:20-04:00",
          "tree_id": "46bfb3cba15364eebafd85cf6845f6ecd6272136",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/ed80104899cfbaaadc28418fa05c5b89af16ee6e"
        },
        "date": 1753459420627,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16451421412713785,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.0785021240000106 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05265992165077496,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.989773791000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8568708853445746,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1670369679999908 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 10.811057780173774,
            "unit": "iter/sec",
            "range": "stddev: 0.025712996200888304",
            "extra": "mean: 92.49788691666083 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2293226606949221,
            "unit": "iter/sec",
            "range": "stddev: 0.0008467009735189392",
            "extra": "mean: 813.4560860000022 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09840069668464729,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.162529673999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.2393322708735943,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 806.8861140000081 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07487425755516379,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.355725086999996 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.631432589161971,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 115.85562300001584 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.5917606374279725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 385.83810000000085 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.137504066918275,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 879.117736000012 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.06864162386668014,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.568419913000014 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 12.933606932581016,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 77.31795199998714 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.144718473551176,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 466.2616619999653 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 37.601469916690945,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 26.594704999979513 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 12.022566742501008,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 83.17691399997784 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 127.49480235506931,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.843457000035414 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 55.5641186038573,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.997225999920374 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.922249005412315,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 83.87679200006914 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.260922207243885,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 234.69097800000327 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6429641840734144,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 274.5017380000263 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1089824697806658,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 901.7275090000112 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "87bc35ebedf7a6549a0fb87a900b271952283a15",
          "message": "Implement cell cycle accuracy metric (#247)\n\n# Proposed Matcher or Metric Addition\n- Metric\n\nCloses #41 \n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests for the standard test examples documented\n[here](https://traccuracy.readthedocs.io/en/latest/test_cases/index.html),\nalong with end-to-end tests.\n- [ ] I have checked that I maintained or improved code coverage.\n- [x] I have added benchmarking functions for my change\n`tests/bench.py`.\n- [x] I have added a page to the documentation with a complete\ndescription of my matcher/metric including any references.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n\n---------\n\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2025-07-26T11:37:25-04:00",
          "tree_id": "f0d5da2ebf981d2475f02b8532db446cd7803f46",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/87bc35ebedf7a6549a0fb87a900b271952283a15"
        },
        "date": 1753544807418,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1657414984784905,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.033491969000011 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05180540249978196,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.303006091000043 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8001236171785476,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2498068780000153 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.774710207160735,
            "unit": "iter/sec",
            "range": "stddev: 0.00052789991899015",
            "extra": "mean: 84.92778016667064 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2350886512051416,
            "unit": "iter/sec",
            "range": "stddev: 0.00007813529932481267",
            "extra": "mean: 809.658479999996 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09969416595401505,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.030677225999966 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.174489691158689,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 851.4336119999939 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07776503237238239,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.859250095999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.928617984936373,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 111.9994160000033 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.8192781949767287,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 354.7007180000037 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1538501168775224,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 866.6636899999958 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07206078381650542,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.877173505999963 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 9.364124973459043,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 106.79054400003452 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.771066685320831,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 360.8718639999893 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 48.385990920149396,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.667139000011048 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.53927149554098,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 68.77923700005795 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 163.99913867824927,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.097592999935841 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 56.642560914397485,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.654569000001175 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.46504861844816,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.26634900002682 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.354838019926306,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 229.62966600005075 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6531503137171604,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.7363410000171 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.126104150609385,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 888.0173290000357 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.36006385082838555,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.777285189000054 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.602627252689748,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.24355799995101 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3a3abc404d10cf14a8780840aaea41ad0fbdcf29",
          "message": "Allow skip edges in divisions (#253)\n\n# Proposed Change\nCloses #214 and #262 as part of the effort in #249 to expand support for\nskip edges in our metrics.\n\nChanges to `_classify_divisions`:\n- In order to handle both skip and normal edges, we now check if out\ngoing edges from a division node are tps or skip_tps instead of checking\nif the daughters match.\n- This change adds the requirement that graphs be annotated with basic\nerrors prior to division annotation, but we handle that automatically if\nit's not already done.\n\nChanges to `_correct_shifted_divisions`:\n- Previously we would look at predecessors/successors in a particular\nframe and check that the nodes had a match in the other graph. This\nbecomes very complicated with skip edges.\n- The new strategy is to take the division node in the earliest frame\nand walk the graph until we find daughters that are true positive nodes.\nFor each valid daughter, we check that on the opposite graph there is a\npath between the match to this daughter and the match to the division\nnode.\n- This works agnostically for both normal and skip edge cases.\n\nUpdates division metrics to handle counting tp skip divisions\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- New feature or enhancement\n\nWhich topics does your change affect? Delete those that do not apply.\n- Track Errors\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...\n\n---------\n\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2025-07-26T11:57:20-04:00",
          "tree_id": "050a06dc598a27a864576e4835dd055a2d403d27",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/3a3abc404d10cf14a8780840aaea41ad0fbdcf29"
        },
        "date": 1753545950055,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16319098074364274,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.12778963300002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.04871074575031315,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.529351061999932 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8094044731638093,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.235476245999962 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.755472016706085,
            "unit": "iter/sec",
            "range": "stddev: 0.0002637868226088395",
            "extra": "mean: 85.0667670833521 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2223321944990242,
            "unit": "iter/sec",
            "range": "stddev: 0.002428903308080894",
            "extra": "mean: 818.108207000023 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09353246757088607,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.691474586000027 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.1431189157825494,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 874.7996259999127 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07651129283311825,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.06996605300003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.580094123291426,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.54883799997151 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.8242387728264355,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 354.077711000059 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.156530206017584,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 864.6553240000685 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.06980740709779729,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.325127398000063 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 11.334327852591954,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 88.22755200003485 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.827490191959695,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 353.6705459999894 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 49.25989471173643,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.30049000006784 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 15.028252061877774,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 66.54133800009276 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.472228415705795,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.22676999999567 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.247502785864003,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 235.43245299993032 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.550001837373372,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.80072800003745 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 2.8072965004808785,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 356.2145999999302 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.599365341183953,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 277.82675700018444 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2607445472665464,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 793.1820940000307 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.36303482206488474,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.7545566960000087 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.103751256224173,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 109.84482900016701 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e8249bcdcc23c0eca0a2f97fd03937a3ab6ad2b4",
          "message": "Documentation updates (#265)\n\n# Proposed Change\nI started this PR just to deal with skip edge related docs changes but\nit ended up involving a long of miscellaneous things\n- Updates to the docs regarding skip edges and divisions are in open PR\n#253\n- Move glossary into a separate documentation page, add terms to close\n#76 and cross-reference terms when useful\n- Fully open to requests for other terms to be added. I went off the\nlist we had in the open issue and then also added some others that I\nthought were useful. But I'm sure there is more that could go in.\n- Cross reference between metrics and the errors that they use\n- Close #260 \n    - Remove references to \"gap closing\"\n    - Add annotated examples of skip edges to basic errors docs\n- Remove stand alone gap closing/skip edge docs page, instead define in\nglossary and reference as needed on specific error/metrics pages\n- Closes #163 \n- Closes #75 \n- Adds a featured works section with links to papers that use traccuracy\n- Closes #266 by toggling \"inherited-members\" in autoapi config\n- Move Results and Matched into their own files to resolve a docs cross\nreferencing issue\n- Closes #269 \n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Documentation update\n\nWhich topics does your change affect? Delete those that do not apply.\n- Track Errors\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...\n\n---------\n\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2025-07-26T15:50:55-04:00",
          "tree_id": "8bf6a5770691f182977a8ebd003825c1fe398016",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/e8249bcdcc23c0eca0a2f97fd03937a3ab6ad2b4"
        },
        "date": 1753560107764,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16574636959043088,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.033314650999955 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.049316902219610444,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.277023799000062 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8154248763857417,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2263545409999779 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.626073571979857,
            "unit": "iter/sec",
            "range": "stddev: 0.0020803615868930678",
            "extra": "mean: 86.01356199999562 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2275484186894214,
            "unit": "iter/sec",
            "range": "stddev: 0.0013074602374305519",
            "extra": "mean: 814.6318180000094 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10294989425249362,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.71346311000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.1740156455547113,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 851.7774050000071 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07779136342917076,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.854897457999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.567215679840062,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.72403699992628 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.953409274641086,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 338.59174500003064 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1573564703273795,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 864.0380260000029 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07213711361802362,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.862489775999961 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 6.354631509946133,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 157.36553700003242 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.819058194435605,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 354.72839900000963 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 42.07635714348452,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.76631599997836 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.505187932772968,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 68.94085099997938 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.185838651936242,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 75.83893799983343 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.212575454387222,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 237.38447200003066 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.368573070174023,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.80229900011182 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 2.954925932151309,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 338.4179580000364 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.658668194799018,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.3235010000499 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2642826628761599,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 790.9623610000835 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.35969012117678445,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.7801708780000354 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.558724636366929,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.83983800003261 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "33e97034c54f9be9728c53709a1e4dce18894e80",
          "message": "Ensure point loader always returns positive integer IDs (#283)\n\n# Proposed Change\n\nThis PR updates the points loader to ensure that the returned graph\ncontains positive integer node IDs.\n\nWe did look at potentially regenerating the node IDs if they do not\nmatch the requirements, but it would be a huge headache to do this and\nstill keep correspondence with the parent IDs so we decided to simply\nerror.\n\n# Types of Changes\n- Maintenance (e.g. dependencies, CI, releases, etc.)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Loaders\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2025-07-28T11:21:10-04:00",
          "tree_id": "1eb245bc3cf6a7c310f6e0b0c9d347d57836b190",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/33e97034c54f9be9728c53709a1e4dce18894e80"
        },
        "date": 1753716682053,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1614621405904259,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.193402343999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.0533022586481427,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.760931062999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.7854170997603955,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.273208846999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.391718189548262,
            "unit": "iter/sec",
            "range": "stddev: 0.0005309478892342728",
            "extra": "mean: 87.78307041667215 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.224091224820749,
            "unit": "iter/sec",
            "range": "stddev: 0.003862734841013405",
            "extra": "mean: 816.9325780000065 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09068082371527304,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 11.027689857999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.1416956195728438,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 875.8901960000003 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07708528388666967,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.972644707000029 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.307063698123649,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 120.37947900000745 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.7449718641620153,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 364.3024589999868 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1475789752432637,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 871.3997219999783 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07066811022865255,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.150654330000009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.594085330467246,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.3590959999965 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.6591982268975958,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 376.0531990000118 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 39.22034195984781,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 25.496972999974332 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.53332012158752,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 68.80740199994761 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 11.521873585680725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 86.79144000007 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 3.756433102989186,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 266.2099849999322 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.562811574413638,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 86.48415599998316 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 2.698837806493108,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 370.52986199989846 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.56653506877492,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 280.38417699997353 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.1777968651014328,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 849.042843999996 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3432297598313279,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.913500276000036 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.583987189938227,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.49598000008154 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "69677db137530911fcdc7b4cc5a1fd8aa7c2d2ed",
          "message": "Update test cases to remove string ids  (#282)\n\n# Proposed Change\nTowards #280, but excludes the track overlap tests 😬 \n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Bugfix (non-breaking change which fixes an issue)\n\nWhich topics does your change affect? Delete those that do not apply.\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...",
          "timestamp": "2025-07-28T11:26:33-04:00",
          "tree_id": "fede6574e4e54e78091ac2fd5aef88b877558d24",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/69677db137530911fcdc7b4cc5a1fd8aa7c2d2ed"
        },
        "date": 1753716966307,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1619752077332605,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.173784334000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.052938590179743075,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.889811697 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8055266850764083,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2414238019999857 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.784923264828723,
            "unit": "iter/sec",
            "range": "stddev: 0.0009588041720665944",
            "extra": "mean: 84.85418000000304 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.237851646574789,
            "unit": "iter/sec",
            "range": "stddev: 0.0007643612172418437",
            "extra": "mean: 807.8512499999988 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.08877316151261888,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 11.264665839999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 1.1135211854337177,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 898.0520650000017 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 0.07656564133441494,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 13.060688613999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 7.867137701571161,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 127.11103300000559 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.6232942045830496,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 381.20009499999696 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 1.1135632367484456,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 898.0181520000201 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.07047850457908911,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 14.188723299000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 10.653869976717127,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 93.86260600001606 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.6037157220893414,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 384.06650599995373 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 38.650179582258986,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 25.873101000001952 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.031467305332821,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 71.26838400000679 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.125955501044034,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 82.46772799998325 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 3.9534487888762437,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 252.9437090000215 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.896412747371224,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 84.0589530000102 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 2.548207856244579,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 392.4326650000012 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.5130967491490313,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 284.6491490000176 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.252880313895914,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 798.1608370000117 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3390678809187901,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.9492619510000395 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.157678395216141,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 122.5838959999237 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jordao.bragantini@gmail.com",
            "name": "Jordão Bragantini",
            "username": "JoOkuma"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "625a6407addfb0ae1390a8ab8e7441933865b294",
          "message": "Improving matching performance (#276)\n\n# Proposed Change\nStoring the bounding box in the nodes to avoid recomputing it.\n\nIt provides about `8.5x (11200 + 11800) / (2270 + 410)` improvement in\nsome functions, see below\n\n### main\n\n```\ntest_ctc_matcher[3d]           11,175.1778 (>1000.0)\ntest_iou_matcher[3d]           11,785.4194 (>1000.0)\n```\n\n### this PR\n\n```\ntest_ctc_matcher[3d]            409.3795 (176.03)  \ntest_iou_matcher[3d]          2,268.3305 (975.35)  \n```\n\nWhole benchmarks results on my laptop:\n\n### main\n```\n----------------------------------------------------\nName (time in ms)                   Median          \n----------------------------------------------------\ntest_iou_div_metrics[2d]            2.1295 (1.0)    \ntest_iou_div_metrics[3d]            8.8162 (4.14)   \ntest_point_seg_matcher[2d]         11.4903 (5.40)   \ntest_load_points                   22.4804 (10.56)  \ntest_point_matcher[2d]             28.3937 (13.33)  \ntest_ctc_metrics[2d]               50.3332 (23.64)  \ntest_basic_metrics[2d]             80.3455 (37.73)  \ntest_point_seg_matcher[3d]         99.6480 (46.79)  \ntest_overlap_metrics[2d]           99.7805 (46.86)  \ntest_basic_metrics[3d]            142.9332 (67.12)  \ntest_ctc_metrics[3d]              145.3468 (68.26)  \ntest_point_matcher[3d]            163.4927 (76.78)  \ntest_overlap_metrics[3d]          336.1538 (157.86) \ntest_ctc_checks[2d]               368.6752 (173.13) \ntest_ctc_matcher[2d]              394.5156 (185.27) \ntest_iou_matcher[2d]              438.8610 (206.09) \ntest_load_pred_ctc_data[2d]       487.2555 (228.82) \ntest_load_gt_ctc_data[2d]       2,271.2443 (>1000.0)\ntest_ctc_checks[3d]             6,985.9930 (>1000.0)\ntest_ctc_matcher[3d]           11,175.1778 (>1000.0)\ntest_iou_matcher[3d]           11,785.4194 (>1000.0)\ntest_load_gt_ctc_data[3d]      12,676.6590 (>1000.0)\n----------------------------------------------------\n```\n\n### this PR\n```\n---------------------------------------------------\nName (time in ms)                 Median           \n---------------------------------------------------\ntest_iou_div_metrics[2d]          2.3257 (1.0)     \ntest_iou_div_metrics[3d]          7.3660 (3.17)    \ntest_point_seg_matcher[2d]       10.5814 (4.55)    \ntest_load_points                 24.4408 (10.51)   \ntest_point_matcher[2d]           28.7146 (12.35)   \ntest_ctc_metrics[2d]             50.6836 (21.79)   \ntest_basic_metrics[2d]           64.0950 (27.56)   \ntest_ctc_matcher[2d]             71.3910 (30.70)   \ntest_point_seg_matcher[3d]       86.3225 (37.12)   \ntest_overlap_metrics[2d]        100.0271 (43.01)   \ntest_basic_metrics[3d]          101.1860 (43.51)   \ntest_iou_matcher[2d]            145.4888 (62.56)   \ntest_ctc_metrics[3d]            162.0895 (69.70)   \ntest_point_matcher[3d]          198.5798 (85.39)   \ntest_overlap_metrics[3d]        305.6566 (131.43)  \ntest_ctc_checks[2d]             406.9829 (175.00)  \ntest_ctc_matcher[3d]            409.3795 (176.03)  \ntest_load_pred_ctc_data[2d]     540.4441 (232.38)  \ntest_iou_matcher[3d]          2,268.3305 (975.35)  \ntest_load_gt_ctc_data[2d]     2,482.8140 (>1000.0) \ntest_ctc_checks[3d]           6,950.1379 (>1000.0) \ntest_load_gt_ctc_data[3d]    11,482.5477 (>1000.0) \n---------------------------------------------------\n```\n\n# Types of Changes\n- New feature or enhancement\n\nWhich topics does your change affect? Delete those that do not apply.\n- Matchers\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\n\nI need to clean up the tests got a bit ugly.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2025-07-28T11:54:09-04:00",
          "tree_id": "a13062327f4ccdd4e8f849a275b63c34eaf27ee7",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/625a6407addfb0ae1390a8ab8e7441933865b294"
        },
        "date": 1753718463828,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15081430637371718,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.630670683999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05228718958506714,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.125143422999983 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8177496392816357,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2228681640000048 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.649077040859657,
            "unit": "iter/sec",
            "range": "stddev: 0.00035648784527610275",
            "extra": "mean: 85.84371074999808 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2108075094557784,
            "unit": "iter/sec",
            "range": "stddev: 0.0014564575356948422",
            "extra": "mean: 825.8951090000011 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10031047908897715,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.969048189999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.401411543316078,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 185.13679100001923 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.486933902888491,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 672.5248500000021 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.520774974368155,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 117.3602169999981 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.7657721141843674,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 361.56268800002067 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.6162139737530135,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 276.5323090000038 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5815197521406573,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7196320439999795 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 11.495146588176823,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 86.99323600001208 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.048243143305697,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 488.22328700003936 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 42.97606130236121,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.268768000036744 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.488709781312222,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.13607499995578 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.424709058657577,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 80.48478200004183 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 2.740294927639612,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 364.92422399999214 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.55344041512323,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 68.71227499999577 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 2.7764053003789,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 360.1779609999767 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.513701826089578,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 284.6001309999906 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2364277113747586,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 808.7816139999973 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.36127216600186995,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.7679962479999745 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.1824442867797,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 108.90346500002579 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d9db36f84226bcb7144c384384d708a1e73923fb",
          "message": "Refactor ctc loader to use uint ids (#281)\n\n# Proposed Change\nContributes towards #280\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Bugfix (non-breaking change which fixes an issue)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Loaders\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2025-07-28T12:50:45-04:00",
          "tree_id": "9513337511447c616a52824103a23747588ebf66",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/d9db36f84226bcb7144c384384d708a1e73923fb"
        },
        "date": 1753721856365,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16573362513880374,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.033778595999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05362679064649543,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.647395974000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9010903222635237,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1097666630000163 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.603254120627817,
            "unit": "iter/sec",
            "range": "stddev: 0.0004315631141358222",
            "extra": "mean: 86.18271991666877 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.214615712577986,
            "unit": "iter/sec",
            "range": "stddev: 0.003336172927195861",
            "extra": "mean: 823.3056674999943 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.1008542174106134,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.91530176599997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.415076615156953,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 184.66959400001315 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.5060825818362846,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 663.9742150000529 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.329589941106345,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 107.18584699998246 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.96521797828824,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 337.2433350000392 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.616581030187245,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 276.50424299997667 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5853231760040996,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7084578929999452 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 11.73245694696192,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 85.23363899996639 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.818051244801835,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 354.85515100003795 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 44.51747684914131,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.46308799999497 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.509270219396692,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 68.92145400001937 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.43451495764541,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.2783929999905 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.745883157551748,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 210.70893800003887 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.359990722293047,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.63792800002011 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.966790499017565,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 201.3372620000382 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.815980492128535,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 262.05584699994233 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3095543991554552,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 763.618526000073 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3520439989659315,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.840554030000021 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.508796492547924,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 105.16577999999299 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9e2dc2bb63fbdf1eb9c4b09cd9a34b9725ebf48b",
          "message": "Merge pull request #285 from live-image-tracking-tools/track_overlap_tests_docs\n\nTrack overlap tests docs",
          "timestamp": "2025-07-29T10:43:59-04:00",
          "tree_id": "74acced8ef22759a619b6947fa96e23092880eae",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/9e2dc2bb63fbdf1eb9c4b09cd9a34b9725ebf48b"
        },
        "date": 1753800658186,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16487180601780702,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.065318407999939 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.050138394551191186,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.944794981000086 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8927163335939651,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1201766589999806 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.668064860600957,
            "unit": "iter/sec",
            "range": "stddev: 0.00022115966697380866",
            "extra": "mean: 85.70401450000986 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2122306501003064,
            "unit": "iter/sec",
            "range": "stddev: 0.007712732567626256",
            "extra": "mean: 824.9255204999599 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09966323083701308,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.03379071300003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.357776710827585,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 186.64458300008846 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4506771221878731,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 689.3332670000518 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.945017082072113,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 111.79408500004229 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.933258871579503,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 340.9177449999561 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.5237948067635854,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 283.78496900006667 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5551866463665099,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.801196060000052 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 9.1787662387077,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 108.94710399998075 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.7871339542004008,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 358.79151000006004 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 44.44334620006825,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.500555999954486 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.230599842438576,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 75.58236300008048 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.618379266610063,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.43017699997745 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.586118827254457,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 218.04930000007516 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.562997715016996,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 68.66718100002345 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.906157135949342,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 203.82551400007287 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6225904946108134,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 276.04555400000663 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2496487705923165,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 800.2248500000633 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3511571519745573,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.847727845999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.045056083610298,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 110.55763399986063 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "111ecec83574716da4d8c1b6348f665ae9df8e28",
          "message": "Implement a loader for geff data (#288)\n\nCloses #287 \n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- New feature or enhancement\n\nWhich topics does your change affect? Delete those that do not apply.\n- Loaders\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...\n\n---------\n\nCo-authored-by: Caroline Malin-Mayor <malinmayorc@janelia.hhmi.org>\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>",
          "timestamp": "2025-07-30T10:43:30-04:00",
          "tree_id": "567da4363dbae51d8609476e7cdd6e5af797b06c",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/111ecec83574716da4d8c1b6348f665ae9df8e28"
        },
        "date": 1753887206624,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16471122955379944,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.071231468000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05403792167515105,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.505522955000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9018737773319937,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1088026119999768 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.605300166891496,
            "unit": "iter/sec",
            "range": "stddev: 0.0003895519357690174",
            "extra": "mean: 86.16752566666719 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2262533374110016,
            "unit": "iter/sec",
            "range": "stddev: 0.0050598623789183264",
            "extra": "mean: 815.4921739999565 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09743284288529447,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.263479647999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.521143891350377,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 181.12188700001752 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4484619543675377,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 690.3874809999024 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.235361905198113,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 108.2794600000625 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 3.0174586688506353,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 331.40470499995445 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.660152243519621,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.2126790000393 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5811250277189335,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7208000900000116 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.096881463252483,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 244.08809700003076 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.8019696019418276,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 356.89180899998973 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 44.975576013618166,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.234289999914836 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.429270062897803,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.30357500004902 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.77729275089472,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.67139400005817 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.771365061014746,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 209.5836280000185 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 15.329553280126744,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 65.2334729999211 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.9521171620607465,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 201.93383299999823 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.753323572714426,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 266.4305330000616 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.316174198329617,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 759.7778479999988 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3500474195762371,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.8567558110000846 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.389408810711226,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 106.50297799998043 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jordao.bragantini@czbiohub.org",
            "name": "Jordão Bragantini",
            "username": "JoOkuma"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3c8777d5ba6499a8c51b6b821e81563d620ccbd0",
          "message": "adding CHOTA metric (#274)\n\nIf you are implementing a new matcher or metric, please append this\n`&template=new_matcher_metric.md` to your url to load the correct\ntemplate.\n\n# Proposed Change\nAdding CHOTA metric, reference https://arxiv.org/pdf/2408.11571\n\n# Types of Changes\n- New feature or enhancement\n\nWhich topics does your change affect? Delete those that do not apply.\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nAny suggestion on how to test this?\n\n---------\n\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2025-07-30T11:32:59-04:00",
          "tree_id": "13eeaa05b71504ed4519457db338559a62cd6bf7",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/3c8777d5ba6499a8c51b6b821e81563d620ccbd0"
        },
        "date": 1753890033613,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1695673117518223,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.897363057000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05013857210816754,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.94472435 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9020653063023486,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1085671880000518 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.544362317157521,
            "unit": "iter/sec",
            "range": "stddev: 0.0020990322412687496",
            "extra": "mean: 86.62236791665616 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2146699275282995,
            "unit": "iter/sec",
            "range": "stddev: 0.0017878028235868303",
            "extra": "mean: 823.2689204999701 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09354178535751202,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.690409597999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.205321431328832,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 192.1110950000866 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4744031080641868,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 678.2405669999889 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.260142745470468,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 107.98969600000419 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 3.0378145884081054,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 329.1840140000204 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.573152477124883,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 279.8649110000042 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5694820735656902,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7559815249999247 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.9808633529228414,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 251.20179000009557 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.7836949854180664,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 359.2347600000494 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 49.02866372560437,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.396232000052805 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.053439835175894,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 71.15695599998162 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.677276341365676,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 68.13253199993596 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.7327586760965765,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 211.29325799995513 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.931320256889606,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 66.97331400005169 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.763190914178904,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 209.94329600000583 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.71221675164366,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 269.38082200001645 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2987512567707333,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 769.9703810000074 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.35232785284892626,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.838265529999944 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.517332208793828,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 105.0714609999659 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.932881445624432,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 517.362305000006 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.99208625493148,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.007976871999972 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4a56de98cf1d8592b7790c1080e16a89813b2629",
          "message": "Remove some ctc functions from public export (#292)\n\n# Proposed Change\nRemove two private functions from public export and make `load_tiffs`\npublic.\n\n# Types of Changes\n- Maintenance (e.g. dependencies, CI, releases, etc.)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Loaders\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>",
          "timestamp": "2025-07-30T11:33:21-04:00",
          "tree_id": "8c5c6bd42b2b989ed2bcb78462ba9ce42130d393",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/4a56de98cf1d8592b7790c1080e16a89813b2629"
        },
        "date": 1753890066445,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.162456403621911,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.155497583999988 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.050026320523108944,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.98947733 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8863559451710573,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.128214918000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 12.024567441839313,
            "unit": "iter/sec",
            "range": "stddev: 0.0003462712007913815",
            "extra": "mean: 83.16307466666235 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.220419601652949,
            "unit": "iter/sec",
            "range": "stddev: 0.0036531208138980364",
            "extra": "mean: 819.3903135000369 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.08123952917671491,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.30927862499999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.351391983747107,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 186.86726800001452 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.3347413110102095,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 749.2088480000234 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.151843395410943,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 109.26760400002422 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.864521159797168,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 349.09848599994575 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.5417003984113595,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 282.35025200001473 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.4994457131497731,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.0022196079999617 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.1024367723541992,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 322.32727799998884 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.7053597095916544,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 369.63661299995465 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 48.847721331969616,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.471783999994386 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.45951104501687,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.29690400010713 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.324026554916378,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.81277199997749 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.64499971865186,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 215.2852660000235 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.40333749529009,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.42835299992112 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.76921724373023,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 209.67801400001918 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7030961627747354,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 270.04429700002675 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2418692738509909,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 805.2377340000021 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3492949131311735,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.862910286999977 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.8272230074539,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 113.28591100004815 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.9462428874844386,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 513.8104840000324 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.937682237663863,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0664593609999429 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "023aac7362b540b47b133b2e8a6ba091c4104acf",
          "message": "Allow skip edge relaxation in track overlap metrics (#289)\n\n# Proposed Change\n\nThis PR implements skip edge relaxation for `Track Purity` and `Target\nEffectiveness` metrics.\n\nRelaxing **either GT or pred** skip edges results in both track purity\nand target effectiveness being affected.\n\"Offset\" skip edges are still considered incorrect, even if there is a\nsingle path between some common predecessor and some common successor of\nthe skip edges.\n\nAll skip-edge-inclusive test cases are checked, but track fractions is\nstill not checked.\n\n# Types of Changes\n- New feature or enhancement\n- Documentation update\n\n- Metrics\n\n# Checklist\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>",
          "timestamp": "2025-07-30T13:20:10-04:00",
          "tree_id": "7476de443dfbcb0f0b6cec1c86e52f47f5dbb7d4",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/023aac7362b540b47b133b2e8a6ba091c4104acf"
        },
        "date": 1753896499294,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16548958566366972,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.0426763170000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05343207414497194,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.715350583000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8984050692965985,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1130836570000042 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.638074673156344,
            "unit": "iter/sec",
            "range": "stddev: 0.004276345328383208",
            "extra": "mean: 85.92486541666015 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2148040582917736,
            "unit": "iter/sec",
            "range": "stddev: 0.0011262337191350483",
            "extra": "mean: 823.1780205000092 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09667980327566943,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.343421957000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.503857849354306,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 181.69073899997557 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4874811518660294,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 672.2774259999937 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.510858632898593,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 105.1429780000035 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.984383069585608,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 335.077627999965 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.6349890156993845,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 275.10399499999494 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5773091276445107,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7321742409999956 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.531080727934807,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 283.1994160000022 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.808993048548419,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 355.9994569999958 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 49.82032548721992,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.072128999970573 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.323869390488754,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.81353800000534 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.818553261384132,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.482971000004 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.898771179990574,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 204.13282499998786 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 15.16664571899767,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 65.93415700001515 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 5.185987614969264,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 192.82730200001197 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7742301423483062,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.954696000018 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3261127783303321,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 754.0836769999828 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3593094071469961,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.783116667999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.718469070948728,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 102.89686499999107 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.054324575509363,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 486.7779960000007 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 1.0002058573685495,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 999.7941849999847 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6a6027a38e650b0a2d0c0d445f53953cc0ecfaaf",
          "message": "Implement a geff exporter for annotated graphs and traccuracy results (#290)\n\nCloses #273. I put the new function in utils but maybe it should live\nelsewhere?\n\n~~Note: Waiting on a release from geff and the pin in pyproject.toml\nneeds to updated to reflect that release~~\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- New feature or enhancement\n\nWhich topics does your change affect? Delete those that do not apply.\n- Core functionality (e.g. `TrackingGraph`, `run_metrics`, `cli`, etc.)\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...\n\n---------\n\nCo-authored-by: Draga Doncila Pop <17995243+DragaDoncila@users.noreply.github.com>\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>",
          "timestamp": "2025-07-30T13:38:56-04:00",
          "tree_id": "bf4a0b491dc6a24c27d508792088e64317565637",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/6a6027a38e650b0a2d0c0d445f53953cc0ecfaaf"
        },
        "date": 1753897976087,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1598049953591802,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.257626663999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05271424058639245,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.970205942000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8791268942809706,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1374922170000161 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.455445161042626,
            "unit": "iter/sec",
            "range": "stddev: 0.002002496496639321",
            "extra": "mean: 87.29473066666789 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1993254302968628,
            "unit": "iter/sec",
            "range": "stddev: 0.00025462349504677185",
            "extra": "mean: 833.8020479999955 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0986384718766406,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.138032159000005 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.353507978183048,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 186.79340799999977 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4409717604608296,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 693.9761259999955 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.876135499606844,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 112.66164199997775 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.8134519815925647,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 355.4352470000026 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.530765277344372,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 283.2247179999854 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5522350545302799,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.81082311199998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 2.9238865576112123,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 342.0105329999501 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.677694003234711,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 373.4556670000302 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 40.703009352566156,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.568208000005143 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.66335453744741,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.18846900000153 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.809849277908958,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 78.0649309999717 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.357834460101544,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 229.4717730000002 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.292648612343873,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 75.22955199999615 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.780657117096995,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 209.17626499999642 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.62800666154237,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 275.6334520000223 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.263177748167973,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 791.6542240000126 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3280007912612371,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.0487731329999974 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.361202475365072,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 119.60002199998598 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.8625028850170873,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 536.9119199999659 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9476457461886755,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0552466510000045 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7c579dc3f7c833b2e90acaf5f8fdf467ec89d781",
          "message": "Raise error if only one graph has error annotations (#294)\n\n# Proposed Change\n\nThis PR checks that error classification functions are being called with\neither both graphs having error annotations, or neither graph having\nerror annotations. This ensures a user cannot end up with inconsistent\nannotations on graphs by accidentally re-running classification on a\ngraph that already has errors annotated e.g. by keeping GT the same and\nonly changing pred.\n\nIn future we may want to add a utility that \"cleans\" an annotated graph\nso that a user can reuse the graph without requiring a copy.\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Bugfix (non-breaking change which fixes an issue)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Track Errors\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>",
          "timestamp": "2025-07-30T15:22:51-04:00",
          "tree_id": "04192d24edb59fea8a57f11be168c7f7dab6a44e",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/7c579dc3f7c833b2e90acaf5f8fdf467ec89d781"
        },
        "date": 1753903815315,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16520862076511464,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.052952899000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.053563805392644555,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.669323298999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.89822762336155,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1133035479999762 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.502504907205397,
            "unit": "iter/sec",
            "range": "stddev: 0.00039936456442464665",
            "extra": "mean: 86.93758516665184 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2098930781613126,
            "unit": "iter/sec",
            "range": "stddev: 0.0007091976959968246",
            "extra": "mean: 826.5193165000255 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0985231414204853,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.149899663999918 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.464761159829733,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 182.99061399989114 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4801456160746467,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 675.6092029999081 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.158181680028092,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 109.19198099998084 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.9176958072730925,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 342.7362090000088 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.6309012425178304,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 275.4137150000133 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5719303772588556,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7484645680000312 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 2.5822658446459594,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 387.2567969999636 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.773114539181005,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 360.6053720000091 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 44.05932676453341,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.696670000073027 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.720036400909965,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 72.88610399996287 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.49626437573475,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.09457699998256 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.719390269502032,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 211.89177899998413 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.905718498412956,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.08834599999136 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.793190739550563,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 208.6292940000476 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.693249455010003,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 270.76427199995123 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2939233003879251,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 772.8433360000508 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3430101536497018,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.915365593000047 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.021254834173554,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 110.84932400001435 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.9698876163158046,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 507.6431730000195 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9638895614937566,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0374632529999417 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e931e90c7aff4a2578be0b3e2f507e3c107ec4cc",
          "message": "Check that node ids are positive integers (#293)\n\nFinishes #280 \n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Bugfix (non-breaking change which fixes an issue)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Core functionality (e.g. `TrackingGraph`, `run_metrics`, `cli`, etc.)\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...",
          "timestamp": "2025-07-30T15:27:19-04:00",
          "tree_id": "55bb6f666f238bb6d297f1430ce73beb52928815",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/e931e90c7aff4a2578be0b3e2f507e3c107ec4cc"
        },
        "date": 1753904124068,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16212493628747426,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.168082608999981 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05179081268392531,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.308443875999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8935564209645622,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1191235119999874 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 12.054743991905282,
            "unit": "iter/sec",
            "range": "stddev: 0.00024593903479863086",
            "extra": "mean: 82.95489316666504 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2207432983625264,
            "unit": "iter/sec",
            "range": "stddev: 0.001559178937790886",
            "extra": "mean: 819.1730409999991 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09480566195541547,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.547893230999989 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.4890198223822635,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 182.18188899999177 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4811817648999226,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 675.1365860000078 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.905068408736964,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 112.29559999998173 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.831024857156874,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 353.2289720000108 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.5924898382018933,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 278.35847700004024 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5755943165577615,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7373347360000366 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 4.367182712919471,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 228.9805730000012 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.756019524215798,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 362.84213199996884 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 41.326183683178044,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.197733999983484 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.93102986726266,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 71.78220200000851 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.094798141193312,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 76.36620200003108 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.201778760851424,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 237.99444400003722 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.820955411936692,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 84.59553099999084 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.738824901931152,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 211.0227790000181 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.4364516599480086,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 290.99783700002035 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2578466597249551,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 795.009465000021 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.34437910379380465,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.903776649000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.981297821426484,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 111.34248299998717 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.95500640728918,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 511.5072749999854 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9417514832145456,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0618512610000153 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "862b0c45000df2d3caef5e59d620fcbff1ed3c81",
          "message": "ci(pre-commit.ci): autoupdate (#298)\n\n<!--pre-commit.ci start-->\nupdates:\n- [github.com/astral-sh/ruff-pre-commit: v0.12.5 →\nv0.12.7](https://github.com/astral-sh/ruff-pre-commit/compare/v0.12.5...v0.12.7)\n- [github.com/pre-commit/mirrors-mypy: v1.17.0 →\nv1.17.1](https://github.com/pre-commit/mirrors-mypy/compare/v1.17.0...v1.17.1)\n<!--pre-commit.ci end-->\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2025-08-06T15:16:18-04:00",
          "tree_id": "665e936367485a3b31ea195c7dab034de7e5ba84",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/862b0c45000df2d3caef5e59d620fcbff1ed3c81"
        },
        "date": 1754508945782,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16047688160021958,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.231427168999971 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05671731505545582,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.63130005400012 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8720850905771105,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1466770970000653 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.868065293496567,
            "unit": "iter/sec",
            "range": "stddev: 0.0004582817114734354",
            "extra": "mean: 84.2597319167074 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.188847644699532,
            "unit": "iter/sec",
            "range": "stddev: 0.006888396674352852",
            "extra": "mean: 841.1506759999838 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09810477906203033,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.19318334500008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.318341877786832,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 188.02852900012113 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4470538012825302,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 691.0593089999111 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.630765106204322,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 115.8645829998477 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.9314376570256226,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 341.12954700003684 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.504923818623873,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 285.31290599994463 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5579712966240566,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7922068860000309 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.6993502398336253,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 270.317741000099 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.5146687796718417,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 397.66668600009325 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 41.11429440803662,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.32244100009484 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.389127254799785,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.68746699987605 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.035817904161823,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 76.71171900005902 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.515181056884706,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 221.47506100009196 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.754951898336003,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.77385700002014 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.889442588922967,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 204.522291000103 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6681586351696756,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 272.61634499996035 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2497853228127325,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 800.1374170000872 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3401472380927239,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.939903336000043 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.54272174418239,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 104.79190599994581 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.0310629467191648,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 492.3530319999827 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9591676886068802,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0425705660002222 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "585951f9b37b95655371f46fb433af58cb6b00dd",
          "message": "Add tests and docs for TF measure (#297)\n\n# Proposed Change\n\nCloses #225, #164\n\nThis PR adds tests and docs for the TF measure (unweighted track\neffectiveness). Currently there are only 6 test cases where the TF value\ndiffers to the TE value, as we can only expect differences there when\nthere is more than one GT track and the errors aren't symmetrical across\ntracks. @msschwartz21 @cmalinmayor let me know if you think this is\nsufficient or if we want to add a couple more tests for which TF is\ndifferent to TE.\n\n# Types of Changes\n\n- Documentation update\n- Tests and benchmarks\n\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2025-08-12T17:02:11-04:00",
          "tree_id": "c847064c56c2aa3992b6e641a44ed5cf4fe806fa",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/585951f9b37b95655371f46fb433af58cb6b00dd"
        },
        "date": 1755032981581,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16710415679579255,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.984291589000009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.0581465526486305,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.197924115000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9028906221136362,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1075538670000071 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.973439056724754,
            "unit": "iter/sec",
            "range": "stddev: 0.00033343298794660987",
            "extra": "mean: 83.51819350000038 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2314133743907314,
            "unit": "iter/sec",
            "range": "stddev: 0.00018254951505942507",
            "extra": "mean: 812.0749870000168 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09887654703303464,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.113621784000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.478757288329263,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 182.5231429999974 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4972156273492867,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 667.9064669999661 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.54362326730545,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 104.78200699998297 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 3.073599617299926,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 325.35142000000405 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.6287700326068273,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 275.57546799999955 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5880813081404873,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7004451359999848 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.820035689142403,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 261.77765899996075 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.805652842814712,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 356.4232840000159 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 50.579394551494566,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.770897000000787 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.12173093049978,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.81284899999218 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.78186548915456,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.65046000003849 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 5.015471953579442,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 199.383030999968 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 15.560778236845271,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 64.26413799999864 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 5.097356034047971,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 196.1801360000095 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7924717872529463,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 263.68027399996663 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3138935564008558,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 761.0966619999999 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3580869169792252,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.7926180840000256 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.887377236344582,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 101.13905600002226 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.0914952410064482,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 478.12683500001185 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9950627196888329,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0049617779999949 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a96e09951cd9692a118ba4d6421232743771006e",
          "message": "docs: :memo: Add metrics overview table and link to in depth descriptions in overviews (#302)\n\n# Proposed Change\nCloses #299, in preparation for students at AI-MBL to explore the\navailable matchers and metrics.\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Documentation update\n\nWhich topics does your change affect? Delete those that do not apply.\n- Matchers\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.",
          "timestamp": "2025-08-22T16:52:25-04:00",
          "tree_id": "4adaef1d41c9abd9e08c939e0d98d310cf892fa0",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/a96e09951cd9692a118ba4d6421232743771006e"
        },
        "date": 1755896479791,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16417887013065263,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.090917785000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05740520189402271,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.420024092000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8939591006989079,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1186194079999723 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 12.014602199089317,
            "unit": "iter/sec",
            "range": "stddev: 0.0006307795160602499",
            "extra": "mean: 83.2320524166666 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2341281524251713,
            "unit": "iter/sec",
            "range": "stddev: 0.003493074972155358",
            "extra": "mean: 810.2886220000016 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09939897947835162,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.060465461999968 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.533475420809308,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 180.7182509999734 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4683215398286587,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 681.049737999956 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.807208333639206,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 113.54335700002594 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.779233733409718,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 359.81140699999514 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.651398022080369,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.8677059999759 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5759779686307477,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7361775179999768 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.644415674616992,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 274.3924100000186 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.7141090909225394,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 368.44502799999646 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 43.207561738097844,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.14409699999942 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.89932882920587,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 71.94592000001876 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.770440721709724,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 72.61931700003288 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.673601883700759,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 213.96773300000405 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.069038686731707,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 76.51672200000803 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.775106111213648,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 209.4194300000254 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.5559486253753865,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 281.2189109999963 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2680551091526089,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 788.6092589999976 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.34308411213160867,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.9147371290000024 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.98953807446999,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 111.24042100004772 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.9795777651687223,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 505.15823000000637 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9493032605805922,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.053404156000056 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "39f4fe43616e18b6a626c3c406b2ab77ce363b9c",
          "message": "ci(dependabot): bump actions/checkout from 4 to 5 (#300)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 4 to\n5.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a\nhref=\"https://github.com/actions/checkout/releases\">actions/checkout's\nreleases</a>.</em></p>\n<blockquote>\n<h2>v5.0.0</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>Update actions checkout to use node 24 by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2226\">actions/checkout#2226</a></li>\n<li>Prepare v5.0.0 release by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2238\">actions/checkout#2238</a></li>\n</ul>\n<h2>⚠️ Minimum Compatible Runner Version</h2>\n<p><strong>v2.327.1</strong><br />\n<a\nhref=\"https://github.com/actions/runner/releases/tag/v2.327.1\">Release\nNotes</a></p>\n<p>Make sure your runner is updated to this version or newer to use this\nrelease.</p>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/checkout/compare/v4...v5.0.0\">https://github.com/actions/checkout/compare/v4...v5.0.0</a></p>\n<h2>v4.3.0</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>docs: update README.md by <a\nhref=\"https://github.com/motss\"><code>@​motss</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1971\">actions/checkout#1971</a></li>\n<li>Add internal repos for checking out multiple repositories by <a\nhref=\"https://github.com/mouismail\"><code>@​mouismail</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1977\">actions/checkout#1977</a></li>\n<li>Documentation update - add recommended permissions to Readme by <a\nhref=\"https://github.com/benwells\"><code>@​benwells</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2043\">actions/checkout#2043</a></li>\n<li>Adjust positioning of user email note and permissions heading by <a\nhref=\"https://github.com/joshmgross\"><code>@​joshmgross</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2044\">actions/checkout#2044</a></li>\n<li>Update README.md by <a\nhref=\"https://github.com/nebuk89\"><code>@​nebuk89</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2194\">actions/checkout#2194</a></li>\n<li>Update CODEOWNERS for actions by <a\nhref=\"https://github.com/TingluoHuang\"><code>@​TingluoHuang</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2224\">actions/checkout#2224</a></li>\n<li>Update package dependencies by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2236\">actions/checkout#2236</a></li>\n<li>Prepare release v4.3.0 by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2237\">actions/checkout#2237</a></li>\n</ul>\n<h2>New Contributors</h2>\n<ul>\n<li><a href=\"https://github.com/motss\"><code>@​motss</code></a> made\ntheir first contribution in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1971\">actions/checkout#1971</a></li>\n<li><a href=\"https://github.com/mouismail\"><code>@​mouismail</code></a>\nmade their first contribution in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1977\">actions/checkout#1977</a></li>\n<li><a href=\"https://github.com/benwells\"><code>@​benwells</code></a>\nmade their first contribution in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2043\">actions/checkout#2043</a></li>\n<li><a href=\"https://github.com/nebuk89\"><code>@​nebuk89</code></a> made\ntheir first contribution in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2194\">actions/checkout#2194</a></li>\n<li><a href=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a>\nmade their first contribution in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2236\">actions/checkout#2236</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/checkout/compare/v4...v4.3.0\">https://github.com/actions/checkout/compare/v4...v4.3.0</a></p>\n<h2>v4.2.2</h2>\n<h2>What's Changed</h2>\n<ul>\n<li><code>url-helper.ts</code> now leverages well-known environment\nvariables by <a href=\"https://github.com/jww3\"><code>@​jww3</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1941\">actions/checkout#1941</a></li>\n<li>Expand unit test coverage for <code>isGhes</code> by <a\nhref=\"https://github.com/jww3\"><code>@​jww3</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1946\">actions/checkout#1946</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/checkout/compare/v4.2.1...v4.2.2\">https://github.com/actions/checkout/compare/v4.2.1...v4.2.2</a></p>\n<h2>v4.2.1</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>Check out other refs/* by commit if provided, fall back to ref by <a\nhref=\"https://github.com/orhantoy\"><code>@​orhantoy</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1924\">actions/checkout#1924</a></li>\n</ul>\n<h2>New Contributors</h2>\n<ul>\n<li><a href=\"https://github.com/Jcambass\"><code>@​Jcambass</code></a>\nmade their first contribution in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1919\">actions/checkout#1919</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/checkout/compare/v4.2.0...v4.2.1\">https://github.com/actions/checkout/compare/v4.2.0...v4.2.1</a></p>\n<!-- raw HTML omitted -->\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a\nhref=\"https://github.com/actions/checkout/blob/main/CHANGELOG.md\">actions/checkout's\nchangelog</a>.</em></p>\n<blockquote>\n<h1>Changelog</h1>\n<h2>V5.0.0</h2>\n<ul>\n<li>Update actions checkout to use node 24 by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2226\">actions/checkout#2226</a></li>\n</ul>\n<h2>V4.3.0</h2>\n<ul>\n<li>docs: update README.md by <a\nhref=\"https://github.com/motss\"><code>@​motss</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1971\">actions/checkout#1971</a></li>\n<li>Add internal repos for checking out multiple repositories by <a\nhref=\"https://github.com/mouismail\"><code>@​mouismail</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1977\">actions/checkout#1977</a></li>\n<li>Documentation update - add recommended permissions to Readme by <a\nhref=\"https://github.com/benwells\"><code>@​benwells</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2043\">actions/checkout#2043</a></li>\n<li>Adjust positioning of user email note and permissions heading by <a\nhref=\"https://github.com/joshmgross\"><code>@​joshmgross</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2044\">actions/checkout#2044</a></li>\n<li>Update README.md by <a\nhref=\"https://github.com/nebuk89\"><code>@​nebuk89</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2194\">actions/checkout#2194</a></li>\n<li>Update CODEOWNERS for actions by <a\nhref=\"https://github.com/TingluoHuang\"><code>@​TingluoHuang</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2224\">actions/checkout#2224</a></li>\n<li>Update package dependencies by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2236\">actions/checkout#2236</a></li>\n</ul>\n<h2>v4.2.2</h2>\n<ul>\n<li><code>url-helper.ts</code> now leverages well-known environment\nvariables by <a href=\"https://github.com/jww3\"><code>@​jww3</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1941\">actions/checkout#1941</a></li>\n<li>Expand unit test coverage for <code>isGhes</code> by <a\nhref=\"https://github.com/jww3\"><code>@​jww3</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1946\">actions/checkout#1946</a></li>\n</ul>\n<h2>v4.2.1</h2>\n<ul>\n<li>Check out other refs/* by commit if provided, fall back to ref by <a\nhref=\"https://github.com/orhantoy\"><code>@​orhantoy</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1924\">actions/checkout#1924</a></li>\n</ul>\n<h2>v4.2.0</h2>\n<ul>\n<li>Add Ref and Commit outputs by <a\nhref=\"https://github.com/lucacome\"><code>@​lucacome</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1180\">actions/checkout#1180</a></li>\n<li>Dependency updates by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a>- <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1777\">actions/checkout#1777</a>,\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1872\">actions/checkout#1872</a></li>\n</ul>\n<h2>v4.1.7</h2>\n<ul>\n<li>Bump the minor-npm-dependencies group across 1 directory with 4\nupdates by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1739\">actions/checkout#1739</a></li>\n<li>Bump actions/checkout from 3 to 4 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1697\">actions/checkout#1697</a></li>\n<li>Check out other refs/* by commit by <a\nhref=\"https://github.com/orhantoy\"><code>@​orhantoy</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1774\">actions/checkout#1774</a></li>\n<li>Pin actions/checkout's own workflows to a known, good, stable\nversion. by <a href=\"https://github.com/jww3\"><code>@​jww3</code></a> in\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1776\">actions/checkout#1776</a></li>\n</ul>\n<h2>v4.1.6</h2>\n<ul>\n<li>Check platform to set archive extension appropriately by <a\nhref=\"https://github.com/cory-miller\"><code>@​cory-miller</code></a> in\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1732\">actions/checkout#1732</a></li>\n</ul>\n<h2>v4.1.5</h2>\n<ul>\n<li>Update NPM dependencies by <a\nhref=\"https://github.com/cory-miller\"><code>@​cory-miller</code></a> in\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1703\">actions/checkout#1703</a></li>\n<li>Bump github/codeql-action from 2 to 3 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1694\">actions/checkout#1694</a></li>\n<li>Bump actions/setup-node from 1 to 4 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1696\">actions/checkout#1696</a></li>\n<li>Bump actions/upload-artifact from 2 to 4 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1695\">actions/checkout#1695</a></li>\n<li>README: Suggest <code>user.email</code> to be\n<code>41898282+github-actions[bot]@users.noreply.github.com</code> by <a\nhref=\"https://github.com/cory-miller\"><code>@​cory-miller</code></a> in\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1707\">actions/checkout#1707</a></li>\n</ul>\n<h2>v4.1.4</h2>\n<ul>\n<li>Disable <code>extensions.worktreeConfig</code> when disabling\n<code>sparse-checkout</code> by <a\nhref=\"https://github.com/jww3\"><code>@​jww3</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1692\">actions/checkout#1692</a></li>\n<li>Add dependabot config by <a\nhref=\"https://github.com/cory-miller\"><code>@​cory-miller</code></a> in\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1688\">actions/checkout#1688</a></li>\n<li>Bump the minor-actions-dependencies group with 2 updates by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1693\">actions/checkout#1693</a></li>\n<li>Bump word-wrap from 1.2.3 to 1.2.5 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1643\">actions/checkout#1643</a></li>\n</ul>\n<h2>v4.1.3</h2>\n<!-- raw HTML omitted -->\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a\nhref=\"https://github.com/actions/checkout/commit/08c6903cd8c0fde910a37f88322edcfb5dd907a8\"><code>08c6903</code></a>\nPrepare v5.0.0 release (<a\nhref=\"https://redirect.github.com/actions/checkout/issues/2238\">#2238</a>)</li>\n<li><a\nhref=\"https://github.com/actions/checkout/commit/9f265659d3bb64ab1440b03b12f4d47a24320917\"><code>9f26565</code></a>\nUpdate actions checkout to use node 24 (<a\nhref=\"https://redirect.github.com/actions/checkout/issues/2226\">#2226</a>)</li>\n<li>See full diff in <a\nhref=\"https://github.com/actions/checkout/compare/v4...v5\">compare\nview</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility\nscore](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=actions/checkout&package-manager=github_actions&previous-version=4&new-version=5)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't\nalter it yourself. You can also trigger a rebase manually by commenting\n`@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits\nthat have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after\nyour CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge\nand block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating\nit. You can achieve the same result by closing it manually\n- `@dependabot show <dependency name> ignore conditions` will show all\nof the ignore conditions of the specified dependency\n- `@dependabot ignore this major version` will close this PR and stop\nDependabot creating any more for this major version (unless you reopen\nthe PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop\nDependabot creating any more for this minor version (unless you reopen\nthe PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop\nDependabot creating any more for this dependency (unless you reopen the\nPR or upgrade to it yourself)\n\n\n</details>\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2025-08-30T16:34:24-04:00",
          "tree_id": "a3aa77a255230efb8d9696cecd255297e2e49f74",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/39f4fe43616e18b6a626c3c406b2ab77ce363b9c"
        },
        "date": 1756586625539,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1642893751752,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.086820884999952 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.058403252771639325,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.122333989000026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9012027746021872,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.109628186000009 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.88493183703923,
            "unit": "iter/sec",
            "range": "stddev: 0.0008777093209865292",
            "extra": "mean: 84.1401544166634 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2223635922387603,
            "unit": "iter/sec",
            "range": "stddev: 0.003741755941793635",
            "extra": "mean: 818.0871929999967 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0999955211206119,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.00044790800007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.6722845861844755,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 176.29580900006658 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.5034577008827805,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 665.1334450000377 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.575115637951116,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 104.4373810000252 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.9488954646634684,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 339.110020000021 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.6517736697581347,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.8395339999897 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6259720790838141,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5975153419999515 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 6.695409927581779,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 149.35605299990584 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.06450747674794,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 484.37703000001875 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 50.81303653139225,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.679989000110254 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 5.051738031777801,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 197.95167400002356 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.791890452565626,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.60461099997883 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.915772418023425,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 203.42683000001216 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 15.595943052264838,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 64.11923900009242 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 5.207487008203957,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 192.03120400004536 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.848770566049081,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 259.8232300000518 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3225068094355399,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 756.139773999962 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.357770617824113,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.7950869920000514 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.77243539386923,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 113.99342999993678 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.0851606204022577,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 479.5793619999813 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9996062401079101,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0003939150000178 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "46bf59dff57e2fbb005f2e0c3c2e913c4b73583c",
          "message": "Improve error test case coverage (#303)\n\nCloses #254 \n\nA few things that I'm deciding we don't need to test, but let me know if\nyou disagree\n- CTC (anything with shifted divisions)\n- Basic (division cases b/c now implicitly tested in division errors\nsince we use node/edge errors; shifted division cases)\n- Divisions (basic node/edge errors, gap close w/o divisions, not\none-to-one)\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Tests and benchmarks\n\nWhich topics does your change affect? Delete those that do not apply.\n- Track Errors\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...",
          "timestamp": "2025-09-11T13:39:46-04:00",
          "tree_id": "23838fa3a292292f8940c0651f7f76f398b8c078",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/46bf59dff57e2fbb005f2e0c3c2e913c4b73583c"
        },
        "date": 1757612943290,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1620248702744798,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.171891995999999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.0559821354561097,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.862841276999973 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8888971718303,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1249895169999604 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.893667920819013,
            "unit": "iter/sec",
            "range": "stddev: 0.0008126541829490125",
            "extra": "mean: 84.07835216666608 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2191659839484594,
            "unit": "iter/sec",
            "range": "stddev: 0.0013099344040189587",
            "extra": "mean: 820.2328584999918 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09823497338132577,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.179673954999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.389499216141226,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 185.54599599997346 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4606931006876083,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 684.606505999966 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.577585660559446,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 104.41044700002067 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.9315627210452515,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 341.11499400000866 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.6263638128752267,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 275.7583220000015 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5763542111048948,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.735044146000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.4089684922572054,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 293.3438670000328 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.7977278857288383,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 357.43290299996033 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 48.24528287774926,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.727415000010296 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 4.834308569681238,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 206.85481399999617 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.26907796772056,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.08161299995663 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.795955175813798,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 208.50903799998832 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.295623807911097,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.9514770000178 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 5.015643642049973,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 199.37620600001082 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.708086813387377,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 269.68084899999667 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3098381825384533,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 763.453084000048 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.3517638292657849,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.842816448999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.440917459293901,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 105.92190900001697 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.053689894205998,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 486.92843200001334 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9815642147843446,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0187820470000588 sec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cmalinmayor@gmail.com",
            "name": "Caroline Malin-Mayor",
            "username": "cmalinmayor"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2e3a01d77bb2a0cb64677b3b2ac150a34e8f5fce",
          "message": "feat: :sparkles: Complete tracks metric (#312)\n\n# Proposed Metric Addition\nCloses #39 by adding the complete tracks metric\n\nQuestions for reviewers:\n- I tested our one larger example. Other end to end tests needed?\n- I didn't allow a larger frame buffer than 0. Should we? I looked into\na bit and it requires a good amount of discussion/reimplementation,\nsince an offset division also makes a bunch of false positive and false\nnegative nodes/edges that we would need to ignore, at least for the\n\"lineage correct\" metric. For tracklets it does't really make sense to\ncorrect shifted divisions, although it would then make a weird\ninconsistency between the definitions if we did correct for the\nlineages.\n- What happened to our CodeCov bot? (I did run it locally and get to\n100% coverage of my added metric file)\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests for the standard test examples documented\n[here](https://traccuracy.readthedocs.io/en/latest/test_cases/index.html),\nalong with end-to-end tests.\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have added benchmarking functions for my change\n`tests/bench.py`.\n- [x] I have added a page to the documentation with a complete\ndescription of my matcher/metric including any references.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n\n# Further Comments\nThings that tripped me up worth discussing:\n- CTC error computation doesn't annotate TP edges\n- What exactly the pyctc metrics does is not entirely clear to me.\nhttps://github.com/CellTrackingChallenge/py-ctcmetrics/blob/3c87a5b9a1ead4018601ba5721bdb8c0238889b2/ctc_metrics/utils/representations.py#L380\n- I think this means if they have a 2-to-1 matching (e.g. a non split\nnode), they remove the second one they come across, to make the matching\n1-to-1? In my implementation, I count all Non-Split Nodes as errors,\nwhich is potentially slightly harsher, but seems more correct.\n\n---------\n\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2025-09-11T14:16:55-04:00",
          "tree_id": "3ed6877fc6d7151a0afbe8074b2c2eff3d5c6169",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/2e3a01d77bb2a0cb64677b3b2ac150a34e8f5fce"
        },
        "date": 1757615196461,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1678264460066089,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.958536475000017 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.054200802013570935,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.449911493000002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9087207672957333,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1004480540000259 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.394300875655677,
            "unit": "iter/sec",
            "range": "stddev: 0.0006900922880246029",
            "extra": "mean: 87.76317309090328 msec\nrounds: 11"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.207861825018359,
            "unit": "iter/sec",
            "range": "stddev: 0.002374451136211096",
            "extra": "mean: 827.9092684999796 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09701012369634364,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.308202504000008 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.281537896795482,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 189.3387910000115 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.3863149775586603,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 721.3367929999777 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.598974871489299,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.29293200002166 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.7641678369207243,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 361.7725330000212 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.5851611085183,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 278.9274929999692 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5503153870140315,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.8171398139999724 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.475487164857293,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 287.7294470000038 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.6705193073684423,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 374.4590040000162 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 41.23701307284042,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.250058999996327 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.389568115668895,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.49478900003214 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 14.864610378711824,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.27387900002668 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.926939133988723,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 202.96577099998103 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 15.074759046559574,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 66.33605199999693 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.741219273756917,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 210.91621000005034 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7786487227206087,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.6448699999837 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.279563916428003,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 781.5162550000423 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.34883271382213776,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.866703609999945 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.420842674213652,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 106.14761700003328 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.049574098092556,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 487.90624399998705 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.9689107816304251,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0320867709999675 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 6.0498669600968205,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 165.29289100003552 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 2.0050726533560383,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 498.7350450001031 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ef7b70d7c90015dc2a657229b8799888de14208d",
          "message": "Move CellCycleAccuracy out of ctc submodule into stand alone submodule (#305)\n\nClose #277 \n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Maintenance (e.g. dependencies, CI, releases, etc.)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...",
          "timestamp": "2025-09-22T17:27:51-04:00",
          "tree_id": "408a3035bcc2522d786a8a74d9b49ac8f0672aef",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/ef7b70d7c90015dc2a657229b8799888de14208d"
        },
        "date": 1758577139981,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15612864498549262,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.404974565000032 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.052421601243832106,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.07610557999999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8706182695554141,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.148609023000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.09246613212877,
            "unit": "iter/sec",
            "range": "stddev: 0.0007490020395277179",
            "extra": "mean: 90.15127818182381 msec\nrounds: 11"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1344715833499284,
            "unit": "iter/sec",
            "range": "stddev: 0.0001694786461702446",
            "extra": "mean: 881.4676494999958 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10065364708916558,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.935059770999999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.55789054888352,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 179.9243780000097 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.47976101705668,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 675.784798000052 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.76329375230868,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 114.11234500002365 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.8308528079964166,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 353.2504400000107 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.9494574033996614,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 253.19933800000172 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6768072072376309,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.477525637000042 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.4391526439632782,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 290.7692979999865 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.619799933895577,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 381.7085370000086 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 40.610446485058525,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.624205999998594 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.404107377733057,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.6039979999864 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.394911293954822,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 80.67827000002126 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.442857139938635,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 225.08038599994507 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.01353355435463,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 76.84308000000328 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.7299138320380525,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 211.4203419999967 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.5160806524632537,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 284.40758299996105 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2793243480781378,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 781.6626029999725 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.2731904255440079,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.6604503909999266 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 7.846686849864217,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 127.44232299996838 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.7627365675761573,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 567.2997420000456 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8167969316330358,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2242945110000392 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.623848699753424,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 177.81417200001215 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.9837785003702608,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 504.0885360000402 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "25802c707b037fce61fcb20ac6f0412fa9f38735",
          "message": "Add tracking graph method for clearing annotations on the graph (#306)\n\nCloses #295\n\nMy approach to this is to create a new method on the tracking graph that\nfirst loops through all nodes and edges and pops off any NodeFlag or\nEdgeFlag items in the attributes. ~~Next I wanted to reset all of the\nattributes on TrackingGraph that we set during initialization which I'm\ncurrently doing by rerunning `__init__`. That feels a bit sketch and\nruff isn't super happy about it. @DragaDoncila @cmalinmayor What do you\nguys think? Should we just pull out what's in the init into a separate\nfunction that makes it easier to rerun and reset those values?~~ Updated\nto use a helper function that is called in the init to set all of those\nvalues and can be rerun after clearing the graph.\n\nNote: I fixed the typing issues in #305 so I'll wait until that PR is\nmerged first\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- New feature or enhancement\n\nWhich topics does your change affect? Delete those that do not apply.\n- Core functionality (e.g. `TrackingGraph`, `run_metrics`, `cli`, etc.)\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...",
          "timestamp": "2025-09-22T17:28:06-04:00",
          "tree_id": "31cbda65c5cc847be4b42121753306715639ff9e",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/25802c707b037fce61fcb20ac6f0412fa9f38735"
        },
        "date": 1758577167801,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1665202341014454,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.005276207999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05951819436478817,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 16.801584972 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8986267437717356,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1128090799999768 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.777823225125697,
            "unit": "iter/sec",
            "range": "stddev: 0.0005949344880397132",
            "extra": "mean: 84.90533275000207 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2244073001021407,
            "unit": "iter/sec",
            "range": "stddev: 0.0016097745493438705",
            "extra": "mean: 816.7216905000316 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10239455544327615,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.766144261000022 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.995865682727804,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 166.7815879999921 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.5519330045669102,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 644.3577119999873 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 9.542120762674964,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 104.79850600000873 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 3.046861299597721,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 328.2066040000018 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.041393291837417,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 247.4394170000096 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6708290428113926,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4906927640000163 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.7698167391055497,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 265.2648839999756 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.887609271791308,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 346.3072409999768 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 48.89643676025765,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.451387999969484 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.169632606933561,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.57345999999143 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.763521748286086,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 72.65582299999096 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.742478351083483,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 210.86021400003574 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.145129281031645,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.69571300002053 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.880167654060448,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 204.9109929999986 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.652986758503719,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.748597000008 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.29238777127861,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 773.7615769999593 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.2828336116420783,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.535647670000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.274668519869335,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 107.82056499999726 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.9490064144609034,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 513.0819439999641 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8633375000533756,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1582955679999714 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.9995353719826605,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 166.67957399999977 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.9817604868611043,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 504.6018460000141 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "594f08f79e8b65a3290bae0c5b2572ece9da84ea",
          "message": "Expose relax skips as an option in run_metrics (#314)\n\nCloses #313\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Bugfix (non-breaking change which fixes an issue)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Core functionality (e.g. `TrackingGraph`, `run_metrics`, `cli`, etc.)\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...",
          "timestamp": "2025-09-22T17:28:20-04:00",
          "tree_id": "f92bcf777d0d0da0ce714a1788b0d8c44a90e697",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/594f08f79e8b65a3290bae0c5b2572ece9da84ea"
        },
        "date": 1758577609679,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1626533181135306,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.148045496999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.053917900097667004,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.546716363 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8906687942820145,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1227518090000217 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.67798752836169,
            "unit": "iter/sec",
            "range": "stddev: 0.00037051994860676826",
            "extra": "mean: 85.63119266666064 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1953566009447751,
            "unit": "iter/sec",
            "range": "stddev: 0.0011333663052316507",
            "extra": "mean: 836.57044200001 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09513179430069105,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.511732773999995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.544309970039796,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 180.36509600000272 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4480840193987294,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 690.5676650000032 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.594179870136163,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.35781599997586 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.7984886068250328,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 357.3357410000426 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.982169834566154,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 251.1193749999734 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6518485647968344,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5340986449999718 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.3560683696638773,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 297.9677079999874 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.686648114089523,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 372.2110070000326 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 44.74080355016337,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.350962000018626 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.40640736985664,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.59119899999678 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 13.893069159036736,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 71.97833599997239 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.599593390424291,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 217.41052200002287 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 14.209074193271045,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.37756200003287 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.775485606238009,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 209.40278799997714 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.4272147528817514,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 291.782124000008 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2033719917628727,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 830.998233999992 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.287938502463204,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.472963815000014 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.618277057663343,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.0324730000184 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.8880170135404968,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 529.656244000023 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8274522167031169,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2085289999999986 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.82649841370614,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 171.62967000001572 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.9301442948852903,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 518.0959799999982 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "47261d95d2d0dac2ccc839bcf5054ccb7e1406af",
          "message": "Use Flag.value for storing flags on graph (#315)\n\nCloses #291 by removing the \"is_\" prefix from Node/EdgeFlags and\nswitching to using `.value` wherever we use a flag. This should also\nsimplify exporting to geff and unblock #309\n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Bugfix (non-breaking change which fixes an issue)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Core functionality (e.g. `TrackingGraph`, `run_metrics`, `cli`, etc.)\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...",
          "timestamp": "2025-09-25T16:49:35-04:00",
          "tree_id": "0ee971565a28d9077a687b8b6d00d0ab0bf43880",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/47261d95d2d0dac2ccc839bcf5054ccb7e1406af"
        },
        "date": 1758835016563,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.162292344914,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.161720076999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.057953944197126364,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.255080975999988 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8918598850412682,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1212523590000103 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.901450538675737,
            "unit": "iter/sec",
            "range": "stddev: 0.00028689088751134056",
            "extra": "mean: 84.02337149999776 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2080456782027853,
            "unit": "iter/sec",
            "range": "stddev: 0.0002006691263318257",
            "extra": "mean: 827.7832684999993 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0979788476426746,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.20628456099999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.891194515213507,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 169.7448619999875 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4949717656193535,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 668.9089540000168 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.497478343558603,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 117.68197100002453 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.878217304042374,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 347.43728299997656 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.010368374312515,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 249.35365199996795 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6852756372546127,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.459266819999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 9.566968762203642,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 104.5263159999763 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.877421584413729,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 347.5333629999682 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 52.11947221528837,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.186687000001257 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.731565537603972,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 67.88144800003693 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.373836364428195,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 80.81568000000061 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.224759146903192,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 236.69988400001785 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.466736720584928,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 80.21345299999894 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.522922865087316,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 221.09596600000714 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.9224349164302725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 254.94368199997552 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3156261369682565,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 760.0943549999783 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.2932037359294026,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.4105977430000394 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.56956718397951,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 104.49793399999407 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.023630749764628,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 494.16129899998396 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8576572505563673,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1659669399999757 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.825031173674882,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 171.67290099996535 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 2.0266938399290786,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 493.41443700001264 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7b9026a3c5159b742a6139d222a09f294c96a351",
          "message": "ci(pre-commit.ci): autoupdate (#307)\n\n<!--pre-commit.ci start-->\nupdates:\n- [github.com/astral-sh/ruff-pre-commit: v0.12.7 →\nv0.13.3](https://github.com/astral-sh/ruff-pre-commit/compare/v0.12.7...v0.13.3)\n- [github.com/pre-commit/mirrors-mypy: v1.17.1 →\nv1.18.2](https://github.com/pre-commit/mirrors-mypy/compare/v1.17.1...v1.18.2)\n<!--pre-commit.ci end-->\n\n---------\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2025-10-07T11:53:24-04:00",
          "tree_id": "3234e0be9bc718e7aacc51ee2978b7e2d62621d8",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/7b9026a3c5159b742a6139d222a09f294c96a351"
        },
        "date": 1759853027438,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15519667295431389,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.443437098000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05750921870705515,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.388516528000082 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8831507858304153,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1323094719999744 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.73089062405995,
            "unit": "iter/sec",
            "range": "stddev: 0.00045119705174507304",
            "extra": "mean: 85.2450194999695 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2020247455341018,
            "unit": "iter/sec",
            "range": "stddev: 0.0024713035520099727",
            "extra": "mean: 831.9296285000064 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0964629878992276,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.36667038600001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.65446026454863,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 176.85153900004025 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4794827528860253,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 675.9119010000632 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 7.981604062806011,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 125.2880990000449 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.601413625854227,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 384.4063819999519 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.021361763223988,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 248.67198200001894 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6411542972662768,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5596869650000826 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 9.880657369223167,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 101.20784100001856 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.817931056645804,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 354.87028599993664 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 42.07306619042343,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.768174999986513 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.743029535437381,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 72.76415999990604 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 11.234655496875101,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 89.01029499998003 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 3.953450570670973,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 252.9435949999197 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.974976609880914,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 83.50746999997227 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.156779195791916,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 240.57087300002422 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.59580262965953,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 278.1020269999317 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2500889797708687,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 799.9430570000641 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.28142779132118423,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.553309342000034 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.781352755277174,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 113.87767099995472 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.8067977179452657,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 553.4653879999496 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8325858412343023,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2010773549998248 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.27768903929692,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 189.47687000013502 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.8814982823133606,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 531.4913170000182 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "98f17c97db6468d0bb4efdd9e48f8642d1c62eb5",
          "message": "Update to geff v1 and add type checking (#309)\n\n# Proposed Change\nThis PR updates geff to v1 and type checks against geff. \n\n# Types of Changes\nWhat types of changes does your code introduce? Delete those that do not\napply.\n- Maintenance (e.g. dependencies, CI, releases, etc.)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Loaders\n- Core functionality (e.g. `TrackingGraph`, `run_metrics`, `cli`, etc.)\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n# Further Comments\nIf this is a relatively large or complex change, kick off the discussion\nby explaining why you chose the solution you did and what alternatives\nyou considered, etc...",
          "timestamp": "2025-10-07T14:32:24-04:00",
          "tree_id": "767cb79581efed177366e60c0820bcdc3f8fb8f6",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/98f17c97db6468d0bb4efdd9e48f8642d1c62eb5"
        },
        "date": 1759862463951,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16105316086524196,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.209129920999999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05594910727360223,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.87338616699998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8863878765539189,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1281742749999921 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.78552460716718,
            "unit": "iter/sec",
            "range": "stddev: 0.00045093907168455323",
            "extra": "mean: 84.84985041665993 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2191109589444147,
            "unit": "iter/sec",
            "range": "stddev: 0.001167789677552801",
            "extra": "mean: 820.2698799999837 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09810406643682403,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.193257388000006 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.667891142756101,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 176.4324639999586 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4709445413250262,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 679.8352840000348 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 7.870587766206005,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 127.05531400001746 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.737414824310848,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 365.30817000004845 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.0219613407385,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 248.63491100001056 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6520653455809736,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.533588629999997 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 8.916644540756709,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 112.14981099999477 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.8724018848483013,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 348.1406989999982 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 47.81402638805995,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.914365000010093 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.556410943999055,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.76583699999628 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.488940730759737,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 80.07084199999781 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.284434782110752,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 233.40301600001112 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 13.065502209879684,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 76.5374329999986 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.509370785893786,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 221.76042900002813 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.775468265949365,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.86780699997325 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2686158594133992,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 788.2606800000076 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.26832760452108845,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.7267876399999977 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.242722659129434,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 108.19322800000464 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.9514702675573823,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 512.4341459999187 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8425205246740611,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1869147050000493 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.347724244663098,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 186.99543100001392 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.8853192679112671,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 530.4141410000511 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ddc843251cd6650926825d74867314e784765b41",
          "message": "ci(dependabot): bump actions/setup-python from 5 to 6 (#310)\n\nBumps [actions/setup-python](https://github.com/actions/setup-python)\nfrom 5 to 6.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a\nhref=\"https://github.com/actions/setup-python/releases\">actions/setup-python's\nreleases</a>.</em></p>\n<blockquote>\n<h2>v6.0.0</h2>\n<h2>What's Changed</h2>\n<h3>Breaking Changes</h3>\n<ul>\n<li>Upgrade to node 24 by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1164\">actions/setup-python#1164</a></li>\n</ul>\n<p>Make sure your runner is on version v2.327.1 or later to ensure\ncompatibility with this release. <a\nhref=\"https://github.com/actions/runner/releases/tag/v2.327.1\">See\nRelease Notes</a></p>\n<h3>Enhancements:</h3>\n<ul>\n<li>Add support for <code>pip-version</code> by <a\nhref=\"https://github.com/priyagupta108\"><code>@​priyagupta108</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1129\">actions/setup-python#1129</a></li>\n<li>Enhance reading from .python-version by <a\nhref=\"https://github.com/krystof-k\"><code>@​krystof-k</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/787\">actions/setup-python#787</a></li>\n<li>Add version parsing from Pipfile by <a\nhref=\"https://github.com/aradkdj\"><code>@​aradkdj</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1067\">actions/setup-python#1067</a></li>\n</ul>\n<h3>Bug fixes:</h3>\n<ul>\n<li>Clarify pythonLocation behaviour for PyPy and GraalPy in environment\nvariables by <a\nhref=\"https://github.com/aparnajyothi-y\"><code>@​aparnajyothi-y</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1183\">actions/setup-python#1183</a></li>\n<li>Change missing cache directory error to warning by <a\nhref=\"https://github.com/aparnajyothi-y\"><code>@​aparnajyothi-y</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1182\">actions/setup-python#1182</a></li>\n<li>Add Architecture-Specific PATH Management for Python with --user\nFlag on Windows by <a\nhref=\"https://github.com/aparnajyothi-y\"><code>@​aparnajyothi-y</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1122\">actions/setup-python#1122</a></li>\n<li>Include python version in PyPy python-version output by <a\nhref=\"https://github.com/cdce8p\"><code>@​cdce8p</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1110\">actions/setup-python#1110</a></li>\n<li>Update docs: clarification on pip authentication with setup-python\nby <a\nhref=\"https://github.com/priya-kinthali\"><code>@​priya-kinthali</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1156\">actions/setup-python#1156</a></li>\n</ul>\n<h3>Dependency updates:</h3>\n<ul>\n<li>Upgrade idna from 2.9 to 3.7 in /<strong>tests</strong>/data by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a>[bot]\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/843\">actions/setup-python#843</a></li>\n<li>Upgrade form-data to fix critical vulnerabilities <a\nhref=\"https://redirect.github.com/actions/setup-python/issues/182\">#182</a>\n&amp; <a\nhref=\"https://redirect.github.com/actions/setup-python/issues/183\">#183</a>\nby <a\nhref=\"https://github.com/aparnajyothi-y\"><code>@​aparnajyothi-y</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1163\">actions/setup-python#1163</a></li>\n<li>Upgrade setuptools to 78.1.1 to fix path traversal vulnerability in\nPackageIndex.download by <a\nhref=\"https://github.com/aparnajyothi-y\"><code>@​aparnajyothi-y</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1165\">actions/setup-python#1165</a></li>\n<li>Upgrade actions/checkout from 4 to 5 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a>[bot]\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1181\">actions/setup-python#1181</a></li>\n<li>Upgrade <code>@​actions/tool-cache</code> from 2.0.1 to 2.0.2 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a>[bot]\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1095\">actions/setup-python#1095</a></li>\n</ul>\n<h2>New Contributors</h2>\n<ul>\n<li><a href=\"https://github.com/krystof-k\"><code>@​krystof-k</code></a>\nmade their first contribution in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/787\">actions/setup-python#787</a></li>\n<li><a href=\"https://github.com/cdce8p\"><code>@​cdce8p</code></a> made\ntheir first contribution in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1110\">actions/setup-python#1110</a></li>\n<li><a href=\"https://github.com/aradkdj\"><code>@​aradkdj</code></a> made\ntheir first contribution in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1067\">actions/setup-python#1067</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/setup-python/compare/v5...v6.0.0\">https://github.com/actions/setup-python/compare/v5...v6.0.0</a></p>\n<h2>v5.6.0</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>Workflow updates related to Ubuntu 20.04 by <a\nhref=\"https://github.com/aparnajyothi-y\"><code>@​aparnajyothi-y</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1065\">actions/setup-python#1065</a></li>\n<li>Fix for Candidate Not Iterable Error by <a\nhref=\"https://github.com/aparnajyothi-y\"><code>@​aparnajyothi-y</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1082\">actions/setup-python#1082</a></li>\n<li>Upgrade semver and <code>@​types/semver</code> by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1091\">actions/setup-python#1091</a></li>\n<li>Upgrade prettier from 2.8.8 to 3.5.3 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1046\">actions/setup-python#1046</a></li>\n<li>Upgrade ts-jest from 29.1.2 to 29.3.2 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1081\">actions/setup-python#1081</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/setup-python/compare/v5...v5.6.0\">https://github.com/actions/setup-python/compare/v5...v5.6.0</a></p>\n<h2>v5.5.0</h2>\n<h2>What's Changed</h2>\n<h3>Enhancements:</h3>\n<ul>\n<li>Support free threaded Python versions like '3.13t' by <a\nhref=\"https://github.com/colesbury\"><code>@​colesbury</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/973\">actions/setup-python#973</a></li>\n<li>Enhance Workflows: Include ubuntu-arm runners, Add e2e Testing for\nfree threaded and Upgrade <code>@​action/cache</code> from 4.0.0 to\n4.0.3 by <a\nhref=\"https://github.com/priya-kinthali\"><code>@​priya-kinthali</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1056\">actions/setup-python#1056</a></li>\n<li>Add support for .tool-versions file in setup-python by <a\nhref=\"https://github.com/mahabaleshwars\"><code>@​mahabaleshwars</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1043\">actions/setup-python#1043</a></li>\n</ul>\n<h3>Bug fixes:</h3>\n<ul>\n<li>Fix architecture for pypy on Linux ARM64 by <a\nhref=\"https://github.com/mayeut\"><code>@​mayeut</code></a> in <a\nhref=\"https://redirect.github.com/actions/setup-python/pull/1011\">actions/setup-python#1011</a>\nThis update maps arm64 to aarch64 for Linux ARM64 PyPy\ninstallations.</li>\n</ul>\n<!-- raw HTML omitted -->\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/e797f83bcb11b83ae66e0230d6156d7c80228e7c\"><code>e797f83</code></a>\nUpgrade to node 24 (<a\nhref=\"https://redirect.github.com/actions/setup-python/issues/1164\">#1164</a>)</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/3d1e2d2ca0a067f27da6fec484fce7f5256def85\"><code>3d1e2d2</code></a>\nRevert &quot;Enhance cache-dependency-path handling to support files\noutside the w...</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/65b071217a8539818fdb8b54561bcbae40380a54\"><code>65b0712</code></a>\nClarify pythonLocation behavior for PyPy and GraalPy in environment\nvariables...</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/5b668cf7652160527499ee14ceaff4be9306cb88\"><code>5b668cf</code></a>\nBump actions/checkout from 4 to 5 (<a\nhref=\"https://redirect.github.com/actions/setup-python/issues/1181\">#1181</a>)</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/f62a0e252fe7114e86949abfa6e1e89f85bb38c2\"><code>f62a0e2</code></a>\nChange missing cache directory error to warning (<a\nhref=\"https://redirect.github.com/actions/setup-python/issues/1182\">#1182</a>)</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/9322b3ca74000aeb2c01eb777b646334015ddd72\"><code>9322b3c</code></a>\nUpgrade setuptools to 78.1.1 to fix path traversal vulnerability in\nPackageIn...</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/fbeb884f69f0ac1c0257302f62aa524c2824b649\"><code>fbeb884</code></a>\nBump form-data to fix critical vulnerabilities <a\nhref=\"https://redirect.github.com/actions/setup-python/issues/182\">#182</a>\n&amp; <a\nhref=\"https://redirect.github.com/actions/setup-python/issues/183\">#183</a>\n(<a\nhref=\"https://redirect.github.com/actions/setup-python/issues/1163\">#1163</a>)</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/03bb6152f4f691b9d64579a1bd791904a083c452\"><code>03bb615</code></a>\nBump idna from 2.9 to 3.7 in /<strong>tests</strong>/data (<a\nhref=\"https://redirect.github.com/actions/setup-python/issues/843\">#843</a>)</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/36da51d563b70a972897150555bb025096d65565\"><code>36da51d</code></a>\nAdd version parsing from Pipfile (<a\nhref=\"https://redirect.github.com/actions/setup-python/issues/1067\">#1067</a>)</li>\n<li><a\nhref=\"https://github.com/actions/setup-python/commit/3c6f142cc0036d53007e92fa1e327564a4cfb7aa\"><code>3c6f142</code></a>\nupdate documentation (<a\nhref=\"https://redirect.github.com/actions/setup-python/issues/1156\">#1156</a>)</li>\n<li>Additional commits viewable in <a\nhref=\"https://github.com/actions/setup-python/compare/v5...v6\">compare\nview</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility\nscore](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=actions/setup-python&package-manager=github_actions&previous-version=5&new-version=6)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't\nalter it yourself. You can also trigger a rebase manually by commenting\n`@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits\nthat have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after\nyour CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge\nand block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating\nit. You can achieve the same result by closing it manually\n- `@dependabot show <dependency name> ignore conditions` will show all\nof the ignore conditions of the specified dependency\n- `@dependabot ignore this major version` will close this PR and stop\nDependabot creating any more for this major version (unless you reopen\nthe PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop\nDependabot creating any more for this minor version (unless you reopen\nthe PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop\nDependabot creating any more for this dependency (unless you reopen the\nPR or upgrade to it yourself)\n\n\n</details>\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Morgan Schwartz <msschwartz21@gmail.com>",
          "timestamp": "2025-10-07T15:13:20-04:00",
          "tree_id": "626e3490808a89b15138f960bfd39de2b4042065",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/ddc843251cd6650926825d74867314e784765b41"
        },
        "date": 1759864840716,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.1769229441424073,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.652178155000001 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.057271797775295306,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.46060083399999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.973135586875263,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0276060329999837 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 15.723915730633967,
            "unit": "iter/sec",
            "range": "stddev: 0.0010886282278308494",
            "extra": "mean: 63.597389933333176 msec\nrounds: 15"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.3898995417930047,
            "unit": "iter/sec",
            "range": "stddev: 0.001358564965787532",
            "extra": "mean: 719.4764584999973 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10952130458747372,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.130643610999982 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 6.07821945125714,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 164.52186499998334 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.5333940509331643,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 652.1480889999793 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.164310137879102,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 122.48432299998058 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.6497332671175786,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 377.3964770000475 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.308409404656144,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 232.1042190000071 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.7926709900258551,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2615574589999596 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 10.577011964504747,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 94.54465999999684 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 1.9417490206436725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 514.9996160000683 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 43.17399309180294,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.16209200000685 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 4.103341759477322,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 243.70380499999555 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 11.561412454055583,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 86.494622000032 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 3.9579304292097053,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 252.65729599993847 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.910905237735841,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 83.95667499996762 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.168482527131446,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 239.8954519999279 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6594128808707356,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.26787999993485 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2464895457707277,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 802.2530179999876 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.28735857611756865,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.479972699999962 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.919359164022696,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 112.11567800000921 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.7514013189635143,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 570.9713640000018 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.837784296288806,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1936246650000157 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.177154031038788,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 193.1563159999996 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.8089743197914947,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 552.7994450000051 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "msschwartz21@gmail.com",
            "name": "Morgan Schwartz",
            "username": "msschwartz21"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ab3a816fe466fa47ecc4ebab6609eaa4e1a94c78",
          "message": "Set label_key in TrackingGraph after loading geff (#317)",
          "timestamp": "2025-10-14T12:17:36-04:00",
          "tree_id": "0c414a9ae5f5d91b0fff5eb855cb7bfddf34ff0c",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/ab3a816fe466fa47ecc4ebab6609eaa4e1a94c78"
        },
        "date": 1760459275070,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15513947587687332,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.4458126749999565 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05277156924428713,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.949597563999987 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8624920141325327,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1594310250000035 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.489004038432372,
            "unit": "iter/sec",
            "range": "stddev: 0.0008474709151282577",
            "extra": "mean: 87.03974658332925 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1955671874093545,
            "unit": "iter/sec",
            "range": "stddev: 0.0006931527359659894",
            "extra": "mean: 836.4230890000215 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.100627683976052,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.937623131999999 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.703924551634414,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 175.3178870000056 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.506386021507785,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 663.840467 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.221521801548809,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 121.63198299998612 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.6771538206459917,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 373.53102100001934 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.165949290198582,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 240.04132800001798 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.674017242133468,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.483641571000021 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 7.267806941001936,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 137.59308799996006 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.7389934779637217,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 365.0976199999718 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 41.75027158558497,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.951939999960814 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.164063595064997,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.60120799997094 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 11.348218261644186,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 88.11955999999554 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.0327426766015035,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 247.97019800001863 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.364372077585688,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 87.99430300001632 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.328190441833173,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 231.0434380000288 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.643496316992414,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 274.4616469999528 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2715913476916143,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 786.4161720000311 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.28040238688034547,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.5663034509999534 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.603501194811436,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 116.23174999999719 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.866390205502366,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 535.7936389999622 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8339716914046861,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1990814680000312 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.406943841675265,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 184.9473620000026 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.8682962564400376,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 535.24701799995 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9526e7b8d4ca7f84eee0d1b45d8bcd16e7f75e16",
          "message": "ci(pre-commit.ci): autoupdate (#318)\n\n<!--pre-commit.ci start-->\nupdates:\n- [github.com/astral-sh/ruff-pre-commit: v0.13.3 →\nv0.14.3](https://github.com/astral-sh/ruff-pre-commit/compare/v0.13.3...v0.14.3)\n<!--pre-commit.ci end-->\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2025-11-03T14:08:25-05:00",
          "tree_id": "5e6ad53ec4fca14ae778af48874eec4c62597bf8",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/9526e7b8d4ca7f84eee0d1b45d8bcd16e7f75e16"
        },
        "date": 1762197497804,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15867826343228314,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.3020603979999805 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05719540681843973,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.483921447999933 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8783987627492924,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1384351190000643 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.689818771628703,
            "unit": "iter/sec",
            "range": "stddev: 0.00042339827146867595",
            "extra": "mean: 85.54452550000254 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.212353420417291,
            "unit": "iter/sec",
            "range": "stddev: 0.005282157659026571",
            "extra": "mean: 824.8419834999936 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10089047452223855,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.91173849400002 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.806428323505127,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 172.22291300004144 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.561344765886728,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 640.4735340000798 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.23340497740895,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 121.4564329999348 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.8576621923401357,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 349.93639300000723 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.14050325788322,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 241.51653499995973 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.69619029680611,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.436388878999992 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.163607979745914,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 316.09478999996554 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 2.875136430254429,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 347.8095820000817 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 51.67821648979619,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 19.350512999949387 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.396545474042895,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 69.46110800004135 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.53860967056885,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 79.75365899994813 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.3020650583389894,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 232.4465080000664 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.852738095273041,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 77.80443299998296 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.5674097519558625,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 218.942476000052 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7689438850498,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 265.3263170000173 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3119135752058282,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 762.2453330000099 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.29673399441218706,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.370021698999949 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.881415504081078,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 101.20007599994096 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.0863964110244733,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 479.29530299995804 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8780937556790367,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1388305559999026 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.805652148381295,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 172.24593800006005 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.9715888564764448,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 507.20513900000697 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "40301980+raphaelreme@users.noreply.github.com",
            "name": "raphaelreme",
            "username": "raphaelreme"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0c0bc23a4b21b9d6245d2dfa9b15d9ed17ce9063",
          "message": "Use pylapy for solving the LAP (sparse) in PointMatcher/IouMatcher (#320)\n\nIt resolves #319\n\nPointMatcher was not solving the correct extended LAP problem. Now it\ndoes, and node labeling do not impact the metric any longer (except if\ntwo costs are strictly equals).\n\nIn addition, the LAP is solved using scipy csgraph instead of\nlinear_sum_assignment, as the LAP is sparse, it is much faster.\n\nI also modified IOUMatcher for its one-to-one assignments, so that it\nsimilarly relies on the sparse solving from pylapy.\n\nWhich topics does your change affect? Delete those that do not apply.\n- Matchers (PointMatcher, IOUMatcher)\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [x] I have read the developer/contributing docs.\n- [x] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [x] I have checked that I maintained or improved code coverage.\n- [x] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [x] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [x] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2025-11-12T10:49:36-05:00",
          "tree_id": "3b46adcb56606330fe4ff910d327ba52bff87d85",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/0c0bc23a4b21b9d6245d2dfa9b15d9ed17ce9063"
        },
        "date": 1762963183865,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15967372444871175,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.2627711819999945 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.057464619000751754,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.402012184 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8790258183709968,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1376230129999954 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.846445321409767,
            "unit": "iter/sec",
            "range": "stddev: 0.00025405434909437654",
            "extra": "mean: 84.41350741667009 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2223615392488583,
            "unit": "iter/sec",
            "range": "stddev: 0.0020610140346489524",
            "extra": "mean: 818.0885669999896 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10071406082806043,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.929100185000038 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.940566050519978,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 168.33412699998007 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.568367370157024,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 637.6057159999959 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.489757612582695,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 117.78899299997647 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.8799139831899274,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 347.2325930000011 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.099585726203694,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 243.92708599998514 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6992873106382835,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.4300273789999665 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 11.967361033298936,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 83.56061099999579 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 3.525780194513445,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 283.6251680000146 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 45.66911556641069,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 21.89663600000813 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 14.174272711334021,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 70.5503570000019 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 11.980107654209242,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 83.47170399997594 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.185100639952673,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 238.94287999996777 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.358063775637834,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 80.91882500002612 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.335494883907369,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 230.65417600003002 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.7845704282267483,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.2307810000375 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.301396214771646,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 768.4054930000457 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.30911078551016274,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.2350860819999525 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 4.11014060507289,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 243.3006790000718 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 3.092135058930658,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 323.4011389999978 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8655046983360318,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1553952299999537 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.762227944689548,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 173.54398500003754 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 2.009699800007379,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 497.5867539999399 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e013ba2f37b82133d43c186ff18a97ef7b734296",
          "message": "ci(pre-commit.ci): autoupdate (#323)\n\n<!--pre-commit.ci start-->\nupdates:\n- [github.com/astral-sh/ruff-pre-commit: v0.14.3 →\nv0.14.7](https://github.com/astral-sh/ruff-pre-commit/compare/v0.14.3...v0.14.7)\n- [github.com/pre-commit/mirrors-mypy: v1.18.2 →\nv1.19.0](https://github.com/pre-commit/mirrors-mypy/compare/v1.18.2...v1.19.0)\n<!--pre-commit.ci end-->\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2025-12-15T17:06:10-05:00",
          "tree_id": "b334f11691af8675b96639f128fa41194f63c7d9",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/e013ba2f37b82133d43c186ff18a97ef7b734296"
        },
        "date": 1765837081937,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.14146296699425517,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 7.068987885999945 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.04918054739227252,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.333242573000007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.7441085672972823,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3438899159999664 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.200968037348462,
            "unit": "iter/sec",
            "range": "stddev: 0.002703064711650776",
            "extra": "mean: 89.27799781818894 msec\nrounds: 11"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1540910812698306,
            "unit": "iter/sec",
            "range": "stddev: 0.004768163861147747",
            "extra": "mean: 866.4827379999451 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0903028476016527,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 11.073847907999948 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.73867758625322,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 174.25617399999282 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.3823185636457473,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 723.4222459999273 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 7.471685319992462,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 133.83861299996624 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.551036189445783,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 391.9975750000049 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.08166172448792,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 244.99825500004135 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6158642868745924,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.623734354000021 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 10.593042591329212,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 94.40158399991105 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 3.4768767098297073,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 287.614455000039 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 40.40022564334785,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 24.75233699999535 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 12.515742457314577,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 79.89937499996813 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 10.482165240501296,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 95.40013699995598 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 3.686101354687345,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 271.28933899996355 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.07641593713001,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 82.80602499996803 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.270349890137037,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 234.17284899994684 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.576109277003323,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 279.6335129999079 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2345341954029163,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 810.0221149999243 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.2768508272989732,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.6120535009999912 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.06390892969128,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 124.00933700007499 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.8320006087662979,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 545.8513470000526 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8245988844070354,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2127108329998464 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.223647435227381,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 191.4371159998609 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.820786612335924,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 549.213176999956 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "63b1eeeb8875465860adecdadd9c6e9b4e7ae3b8",
          "message": "Pass label key to overlap compute (#325)\n\n# Proposed Change\nNoticed that when computing the bbox and labels, we were strictly\nlooking for `\"segmentation_id\"` rather than passing the graph's\n`label_key` in. This PR updates the `graph_bbox_and_labels` function to\nuse the `label_key`, and adds tests that were failing with main, but\npass with this change.\n\n# Types of Changes\n- Bugfix (non-breaking change which fixes an issue)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Matchers\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>",
          "timestamp": "2025-12-15T17:11:44-05:00",
          "tree_id": "538b45c70d2abf933707f540fc0eccbb960fa2f0",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/63b1eeeb8875465860adecdadd9c6e9b4e7ae3b8"
        },
        "date": 1765837298477,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.14995265936811963,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.668771359000004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05501575152488409,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.176612557 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8398778187742991,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1906493750000209 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.389139140487183,
            "unit": "iter/sec",
            "range": "stddev: 0.0016854243358495494",
            "extra": "mean: 87.80294872727526 msec\nrounds: 11"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1723988690318343,
            "unit": "iter/sec",
            "range": "stddev: 0.004469306594264691",
            "extra": "mean: 852.9520339999976 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09332622223108329,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.715102102000003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.605543110813758,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 178.39484600000333 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4353242786733384,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 696.7066710000154 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.17926949913293,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 122.26030700003321 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.6589555608202105,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 376.0875189999524 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.06901606255913,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 245.75965899998664 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6564372763649827,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.5233747930000163 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 11.068969576116727,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 90.34264600001052 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 3.2996207016714014,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 303.06513699997595 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 38.376668459256244,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 26.057498999989548 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.421481688090857,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.50742200001059 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 10.353782429814654,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 96.58306100004665 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 3.8088490555898273,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 262.54650300001003 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 10.989772423242114,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 90.99369500000876 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.064240259417584,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 246.04844599991793 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.5853542795232753,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 278.91246499996214 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.230130248884693,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 812.9220470000291 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.2847574657263166,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.5117604289999917 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.79687924023758,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 113.676676999944 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.7610526428718825,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 567.8421960000151 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.831378310516991,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2028218529999322 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.214961005547518,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 191.7559879999544 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.7630179855267316,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 567.2091879999925 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d94f66cfa2d9a13fd2da5b3976d97eaea9e896d0",
          "message": "Fix argument to `_get_mbc` (#326)\n\n# Proposed Change\nCloses #321.\n\nWe were accidentally passing the wrong value through to the `get_mbc`\nfunction during the frame buffer checks, giving us the strange 0.5\nreported in #321. Added a test that passes with PR and fails on main.\n\n# Types of Changes\n- Bugfix (non-breaking change which fixes an issue)\n\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>",
          "timestamp": "2025-12-15T17:14:01-05:00",
          "tree_id": "8aea28ddce435067ea979a9a3a81ea40bf68a7c1",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/d94f66cfa2d9a13fd2da5b3976d97eaea9e896d0"
        },
        "date": 1765837428583,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.16081631700503538,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.218274479999991 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05664601802939687,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.653491539000015 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8769836264631276,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1402721439999937 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.50802150479734,
            "unit": "iter/sec",
            "range": "stddev: 0.003865156986731837",
            "extra": "mean: 86.89590991667255 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2147804873498544,
            "unit": "iter/sec",
            "range": "stddev: 0.002399548477184718",
            "extra": "mean: 823.1939929999896 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.09884106829094293,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 10.117252041999961 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.750129987438832,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 173.90911199998982 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4992046052423005,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 667.020363000006 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 7.960182086615934,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 125.62526700003218 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.7510096363548677,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 363.5029069999973 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.096610244695508,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 244.1042570000036 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.7387803880754777,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3535822229999894 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 11.431392565611814,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 87.47840600000245 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 3.4948337602455566,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 286.13664300007713 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 42.640459271855605,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 23.451905000001716 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.659719210536021,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.20794700001443 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 11.32331327302769,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 88.31337399999484 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 3.910941418665953,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 255.69291199997224 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.518481536086268,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 86.81699900000694 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.17872149466757,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 239.30764500005353 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.613804559957252,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 276.7166799999359 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2264472217031757,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 815.3632559999551 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.277938066050158,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.597923862000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 3.295782581810928,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 303.4180729999889 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 2.878431274298303,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 347.41145600003165 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.839651366307425,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.19097049100003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 4.9383809565442665,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 202.49551599999904 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.805822434541866,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 553.7643019999905 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "363b84ee7ea3103ca54198c28c72afa0b570611c",
          "message": "ci(dependabot): bump actions/cache from 4 to 5 (#327)\n\nBumps [actions/cache](https://github.com/actions/cache) from 4 to 5.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a\nhref=\"https://github.com/actions/cache/releases\">actions/cache's\nreleases</a>.</em></p>\n<blockquote>\n<h2>v5.0.0</h2>\n<blockquote>\n<p>[!IMPORTANT]\n<strong><code>actions/cache@v5</code> runs on the Node.js 24 runtime and\nrequires a minimum Actions Runner version of\n<code>2.327.1</code>.</strong></p>\n<p>If you are using self-hosted runners, ensure they are updated before\nupgrading.</p>\n</blockquote>\n<hr />\n<h2>What's Changed</h2>\n<ul>\n<li>Upgrade to use node24 by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1630\">actions/cache#1630</a></li>\n<li>Prepare v5.0.0 release by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1684\">actions/cache#1684</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/cache/compare/v4.3.0...v5.0.0\">https://github.com/actions/cache/compare/v4.3.0...v5.0.0</a></p>\n<h2>v4.3.0</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>Add note on runner versions by <a\nhref=\"https://github.com/GhadimiR\"><code>@​GhadimiR</code></a> in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1642\">actions/cache#1642</a></li>\n<li>Prepare <code>v4.3.0</code> release by <a\nhref=\"https://github.com/Link\"><code>@​Link</code></a>- in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1655\">actions/cache#1655</a></li>\n</ul>\n<h2>New Contributors</h2>\n<ul>\n<li><a href=\"https://github.com/GhadimiR\"><code>@​GhadimiR</code></a>\nmade their first contribution in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1642\">actions/cache#1642</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/cache/compare/v4...v4.3.0\">https://github.com/actions/cache/compare/v4...v4.3.0</a></p>\n<h2>v4.2.4</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>Update README.md by <a\nhref=\"https://github.com/nebuk89\"><code>@​nebuk89</code></a> in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1620\">actions/cache#1620</a></li>\n<li>Upgrade <code>@actions/cache</code> to <code>4.0.5</code> and move\n<code>@protobuf-ts/plugin</code> to dev depdencies by <a\nhref=\"https://github.com/Link\"><code>@​Link</code></a>- in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1634\">actions/cache#1634</a></li>\n<li>Prepare release <code>4.2.4</code> by <a\nhref=\"https://github.com/Link\"><code>@​Link</code></a>- in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1636\">actions/cache#1636</a></li>\n</ul>\n<h2>New Contributors</h2>\n<ul>\n<li><a href=\"https://github.com/nebuk89\"><code>@​nebuk89</code></a> made\ntheir first contribution in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1620\">actions/cache#1620</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/cache/compare/v4...v4.2.4\">https://github.com/actions/cache/compare/v4...v4.2.4</a></p>\n<h2>v4.2.3</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>Update to use <code>@​actions/cache</code> 4.0.3 package &amp;\nprepare for new release by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1577\">actions/cache#1577</a>\n(SAS tokens for cache entries are now masked in debug logs)</li>\n</ul>\n<h2>New Contributors</h2>\n<ul>\n<li><a href=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a>\nmade their first contribution in <a\nhref=\"https://redirect.github.com/actions/cache/pull/1577\">actions/cache#1577</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/cache/compare/v4.2.2...v4.2.3\">https://github.com/actions/cache/compare/v4.2.2...v4.2.3</a></p>\n<!-- raw HTML omitted -->\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a\nhref=\"https://github.com/actions/cache/blob/main/RELEASES.md\">actions/cache's\nchangelog</a>.</em></p>\n<blockquote>\n<h1>Releases</h1>\n<h2>Changelog</h2>\n<h3>5.0.1</h3>\n<ul>\n<li>Update <code>@azure/storage-blob</code> to <code>^12.29.1</code> via\n<code>@actions/cache@5.0.1</code> <a\nhref=\"https://redirect.github.com/actions/cache/pull/1685\">#1685</a></li>\n</ul>\n<h3>5.0.0</h3>\n<blockquote>\n<p>[!IMPORTANT]\n<code>actions/cache@v5</code> runs on the Node.js 24 runtime and\nrequires a minimum Actions Runner version of <code>2.327.1</code>.\nIf you are using self-hosted runners, ensure they are updated before\nupgrading.</p>\n</blockquote>\n<h3>4.3.0</h3>\n<ul>\n<li>Bump <code>@actions/cache</code> to <a\nhref=\"https://redirect.github.com/actions/toolkit/pull/2132\">v4.1.0</a></li>\n</ul>\n<h3>4.2.4</h3>\n<ul>\n<li>Bump <code>@actions/cache</code> to v4.0.5</li>\n</ul>\n<h3>4.2.3</h3>\n<ul>\n<li>Bump <code>@actions/cache</code> to v4.0.3 (obfuscates SAS token in\ndebug logs for cache entries)</li>\n</ul>\n<h3>4.2.2</h3>\n<ul>\n<li>Bump <code>@actions/cache</code> to v4.0.2</li>\n</ul>\n<h3>4.2.1</h3>\n<ul>\n<li>Bump <code>@actions/cache</code> to v4.0.1</li>\n</ul>\n<h3>4.2.0</h3>\n<p>TLDR; The cache backend service has been rewritten from the ground up\nfor improved performance and reliability. <a\nhref=\"https://github.com/actions/cache\">actions/cache</a> now integrates\nwith the new cache service (v2) APIs.</p>\n<p>The new service will gradually roll out as of <strong>February 1st,\n2025</strong>. The legacy service will also be sunset on the same date.\nChanges in these release are <strong>fully backward\ncompatible</strong>.</p>\n<p><strong>We are deprecating some versions of this action</strong>. We\nrecommend upgrading to version <code>v4</code> or <code>v3</code> as\nsoon as possible before <strong>February 1st, 2025.</strong> (Upgrade\ninstructions below).</p>\n<p>If you are using pinned SHAs, please use the SHAs of versions\n<code>v4.2.0</code> or <code>v3.4.0</code></p>\n<p>If you do not upgrade, all workflow runs using any of the deprecated\n<a href=\"https://github.com/actions/cache\">actions/cache</a> will\nfail.</p>\n<p>Upgrading to the recommended versions will not break your\nworkflows.</p>\n<h3>4.1.2</h3>\n<!-- raw HTML omitted -->\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a\nhref=\"https://github.com/actions/cache/commit/9255dc7a253b0ccc959486e2bca901246202afeb\"><code>9255dc7</code></a>\nMerge pull request <a\nhref=\"https://redirect.github.com/actions/cache/issues/1686\">#1686</a>\nfrom actions/cache-v5.0.1-release</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/8ff5423e8b66eacab4e638ee52abbd2cb831366a\"><code>8ff5423</code></a>\nchore: release v5.0.1</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/9233019a152bc768059ac1768b8e4403b5da16c1\"><code>9233019</code></a>\nMerge pull request <a\nhref=\"https://redirect.github.com/actions/cache/issues/1685\">#1685</a>\nfrom salmanmkc/node24-storage-blob-fix</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/b975f2bb844529e1063ad882c609b224bcd66eb6\"><code>b975f2b</code></a>\nfix: add peer property to package-lock.json for dependencies</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/d0a0e1813491d01d574c95f8d189f62622bbb2ae\"><code>d0a0e18</code></a>\nfix: update license files for <code>@​actions/cache</code>,\nfast-xml-parser, and strnum</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/74de208dcfcbe85c0e7154e7b17e4105fe2554ff\"><code>74de208</code></a>\nfix: update <code>@​actions/cache</code> to ^5.0.1 for Node.js 24\npunycode fix</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/ac7f1152ead02e89c14b5456d14ab17591e74cfb\"><code>ac7f115</code></a>\npeer</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/b0f846b50b6061d7a2ca6f1a2fea61d4a65d1a16\"><code>b0f846b</code></a>\nfix: update <code>@​actions/cache</code> with storage-blob fix for\nNode.js 24 punycode depr...</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/a7833574556fa59680c1b7cb190c1735db73ebf0\"><code>a783357</code></a>\nMerge pull request <a\nhref=\"https://redirect.github.com/actions/cache/issues/1684\">#1684</a>\nfrom actions/prepare-cache-v5-release</li>\n<li><a\nhref=\"https://github.com/actions/cache/commit/3bb0d78750a39cefce0c2b5a0a9801052b4359ad\"><code>3bb0d78</code></a>\ndocs: highlight v5 runner requirement in releases</li>\n<li>Additional commits viewable in <a\nhref=\"https://github.com/actions/cache/compare/v4...v5\">compare\nview</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility\nscore](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=actions/cache&package-manager=github_actions&previous-version=4&new-version=5)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't\nalter it yourself. You can also trigger a rebase manually by commenting\n`@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits\nthat have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after\nyour CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge\nand block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating\nit. You can achieve the same result by closing it manually\n- `@dependabot show <dependency name> ignore conditions` will show all\nof the ignore conditions of the specified dependency\n- `@dependabot ignore this major version` will close this PR and stop\nDependabot creating any more for this major version (unless you reopen\nthe PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop\nDependabot creating any more for this minor version (unless you reopen\nthe PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop\nDependabot creating any more for this dependency (unless you reopen the\nPR or upgrade to it yourself)\n\n\n</details>\n\n---------\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Caroline Malin-Mayor <malinmayorc@janelia.hhmi.org>",
          "timestamp": "2025-12-15T17:48:04-05:00",
          "tree_id": "7d88ea07acbd9620b8c969d6d327fee1741ffaeb",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/363b84ee7ea3103ca54198c28c72afa0b570611c"
        },
        "date": 1765839544820,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17745222433712105,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.635319611999989 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.055018805713340495,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.175603541999976 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.9377749336314881,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.0663539449999462 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 14.76180840997739,
            "unit": "iter/sec",
            "range": "stddev: 0.0012579872863470812",
            "extra": "mean: 67.74237764284408 msec\nrounds: 14"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.2038166421584762,
            "unit": "iter/sec",
            "range": "stddev: 0.0024508342249730487",
            "extra": "mean: 830.691290499999 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.05632207991684555,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.755026119000036 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 6.0495910385713305,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 165.30043000000205 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.5864341377056186,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 630.3444790000867 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.93058248411623,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 111.97477899997921 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.8973052109184225,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 345.14831100000265 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.045779221812351,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 247.17117399995914 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6162016832693973,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.622845290999976 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 12.775717714584982,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 78.27348900002562 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 3.9453806085183234,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 253.46097100009501 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 44.19719355787026,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 22.62587099994562 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.654064393042551,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.23826600008942 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.08554978791102,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 82.74344300002667 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.210881306380939,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 237.4799780000103 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.670380346700208,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 78.92422899999474 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.432151291734532,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 225.6240669998988 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 4.044328002670336,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 247.2598659999221 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.4168130983143685,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 705.8093980001559 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.346512114464769,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.885901988000114 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 4.057992824143211,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 246.42724700015606 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 3.2553959318815315,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 307.18229700005395 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8367474792082711,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1951036899999963 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.8761038775326195,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 170.18078999990394 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 2.021764186334328,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 494.61752599995634 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cf7d6a64036b34e23ab61a3afd79645321bf0c57",
          "message": "ci(dependabot): bump actions/checkout from 5 to 6 (#322)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 5 to\n6.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a\nhref=\"https://github.com/actions/checkout/releases\">actions/checkout's\nreleases</a>.</em></p>\n<blockquote>\n<h2>v6.0.0</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>Update README to include Node.js 24 support details and requirements\nby <a href=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2248\">actions/checkout#2248</a></li>\n<li>Persist creds to a separate file by <a\nhref=\"https://github.com/ericsciple\"><code>@​ericsciple</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2286\">actions/checkout#2286</a></li>\n<li>v6-beta by <a\nhref=\"https://github.com/ericsciple\"><code>@​ericsciple</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2298\">actions/checkout#2298</a></li>\n<li>update readme/changelog for v6 by <a\nhref=\"https://github.com/ericsciple\"><code>@​ericsciple</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2311\">actions/checkout#2311</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/checkout/compare/v5.0.0...v6.0.0\">https://github.com/actions/checkout/compare/v5.0.0...v6.0.0</a></p>\n<h2>v6-beta</h2>\n<h2>What's Changed</h2>\n<p>Updated persist-credentials to store the credentials under\n<code>$RUNNER_TEMP</code> instead of directly in the local git\nconfig.</p>\n<p>This requires a minimum Actions Runner version of <a\nhref=\"https://github.com/actions/runner/releases/tag/v2.329.0\">v2.329.0</a>\nto access the persisted credentials for <a\nhref=\"https://docs.github.com/en/actions/tutorials/use-containerized-services/create-a-docker-container-action\">Docker\ncontainer action</a> scenarios.</p>\n<h2>v5.0.1</h2>\n<h2>What's Changed</h2>\n<ul>\n<li>Port v6 cleanup to v5 by <a\nhref=\"https://github.com/ericsciple\"><code>@​ericsciple</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2301\">actions/checkout#2301</a></li>\n</ul>\n<p><strong>Full Changelog</strong>: <a\nhref=\"https://github.com/actions/checkout/compare/v5...v5.0.1\">https://github.com/actions/checkout/compare/v5...v5.0.1</a></p>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a\nhref=\"https://github.com/actions/checkout/blob/main/CHANGELOG.md\">actions/checkout's\nchangelog</a>.</em></p>\n<blockquote>\n<h1>Changelog</h1>\n<h2>V6.0.0</h2>\n<ul>\n<li>Persist creds to a separate file by <a\nhref=\"https://github.com/ericsciple\"><code>@​ericsciple</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2286\">actions/checkout#2286</a></li>\n<li>Update README to include Node.js 24 support details and requirements\nby <a href=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2248\">actions/checkout#2248</a></li>\n</ul>\n<h2>V5.0.1</h2>\n<ul>\n<li>Port v6 cleanup to v5 by <a\nhref=\"https://github.com/ericsciple\"><code>@​ericsciple</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2301\">actions/checkout#2301</a></li>\n</ul>\n<h2>V5.0.0</h2>\n<ul>\n<li>Update actions checkout to use node 24 by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2226\">actions/checkout#2226</a></li>\n</ul>\n<h2>V4.3.1</h2>\n<ul>\n<li>Port v6 cleanup to v4 by <a\nhref=\"https://github.com/ericsciple\"><code>@​ericsciple</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2305\">actions/checkout#2305</a></li>\n</ul>\n<h2>V4.3.0</h2>\n<ul>\n<li>docs: update README.md by <a\nhref=\"https://github.com/motss\"><code>@​motss</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1971\">actions/checkout#1971</a></li>\n<li>Add internal repos for checking out multiple repositories by <a\nhref=\"https://github.com/mouismail\"><code>@​mouismail</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1977\">actions/checkout#1977</a></li>\n<li>Documentation update - add recommended permissions to Readme by <a\nhref=\"https://github.com/benwells\"><code>@​benwells</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2043\">actions/checkout#2043</a></li>\n<li>Adjust positioning of user email note and permissions heading by <a\nhref=\"https://github.com/joshmgross\"><code>@​joshmgross</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2044\">actions/checkout#2044</a></li>\n<li>Update README.md by <a\nhref=\"https://github.com/nebuk89\"><code>@​nebuk89</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2194\">actions/checkout#2194</a></li>\n<li>Update CODEOWNERS for actions by <a\nhref=\"https://github.com/TingluoHuang\"><code>@​TingluoHuang</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2224\">actions/checkout#2224</a></li>\n<li>Update package dependencies by <a\nhref=\"https://github.com/salmanmkc\"><code>@​salmanmkc</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/2236\">actions/checkout#2236</a></li>\n</ul>\n<h2>v4.2.2</h2>\n<ul>\n<li><code>url-helper.ts</code> now leverages well-known environment\nvariables by <a href=\"https://github.com/jww3\"><code>@​jww3</code></a>\nin <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1941\">actions/checkout#1941</a></li>\n<li>Expand unit test coverage for <code>isGhes</code> by <a\nhref=\"https://github.com/jww3\"><code>@​jww3</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1946\">actions/checkout#1946</a></li>\n</ul>\n<h2>v4.2.1</h2>\n<ul>\n<li>Check out other refs/* by commit if provided, fall back to ref by <a\nhref=\"https://github.com/orhantoy\"><code>@​orhantoy</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1924\">actions/checkout#1924</a></li>\n</ul>\n<h2>v4.2.0</h2>\n<ul>\n<li>Add Ref and Commit outputs by <a\nhref=\"https://github.com/lucacome\"><code>@​lucacome</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1180\">actions/checkout#1180</a></li>\n<li>Dependency updates by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a>- <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1777\">actions/checkout#1777</a>,\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1872\">actions/checkout#1872</a></li>\n</ul>\n<h2>v4.1.7</h2>\n<ul>\n<li>Bump the minor-npm-dependencies group across 1 directory with 4\nupdates by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1739\">actions/checkout#1739</a></li>\n<li>Bump actions/checkout from 3 to 4 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1697\">actions/checkout#1697</a></li>\n<li>Check out other refs/* by commit by <a\nhref=\"https://github.com/orhantoy\"><code>@​orhantoy</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1774\">actions/checkout#1774</a></li>\n<li>Pin actions/checkout's own workflows to a known, good, stable\nversion. by <a href=\"https://github.com/jww3\"><code>@​jww3</code></a> in\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1776\">actions/checkout#1776</a></li>\n</ul>\n<h2>v4.1.6</h2>\n<ul>\n<li>Check platform to set archive extension appropriately by <a\nhref=\"https://github.com/cory-miller\"><code>@​cory-miller</code></a> in\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1732\">actions/checkout#1732</a></li>\n</ul>\n<h2>v4.1.5</h2>\n<ul>\n<li>Update NPM dependencies by <a\nhref=\"https://github.com/cory-miller\"><code>@​cory-miller</code></a> in\n<a\nhref=\"https://redirect.github.com/actions/checkout/pull/1703\">actions/checkout#1703</a></li>\n<li>Bump github/codeql-action from 2 to 3 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1694\">actions/checkout#1694</a></li>\n<li>Bump actions/setup-node from 1 to 4 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1696\">actions/checkout#1696</a></li>\n<li>Bump actions/upload-artifact from 2 to 4 by <a\nhref=\"https://github.com/dependabot\"><code>@​dependabot</code></a> in <a\nhref=\"https://redirect.github.com/actions/checkout/pull/1695\">actions/checkout#1695</a></li>\n</ul>\n<!-- raw HTML omitted -->\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a\nhref=\"https://github.com/actions/checkout/commit/1af3b93b6815bc44a9784bd300feb67ff0d1eeb3\"><code>1af3b93</code></a>\nupdate readme/changelog for v6 (<a\nhref=\"https://redirect.github.com/actions/checkout/issues/2311\">#2311</a>)</li>\n<li><a\nhref=\"https://github.com/actions/checkout/commit/71cf2267d89c5cb81562390fa70a37fa40b1305e\"><code>71cf226</code></a>\nv6-beta (<a\nhref=\"https://redirect.github.com/actions/checkout/issues/2298\">#2298</a>)</li>\n<li><a\nhref=\"https://github.com/actions/checkout/commit/069c6959146423d11cd0184e6accf28f9d45f06e\"><code>069c695</code></a>\nPersist creds to a separate file (<a\nhref=\"https://redirect.github.com/actions/checkout/issues/2286\">#2286</a>)</li>\n<li><a\nhref=\"https://github.com/actions/checkout/commit/ff7abcd0c3c05ccf6adc123a8cd1fd4fb30fb493\"><code>ff7abcd</code></a>\nUpdate README to include Node.js 24 support details and requirements (<a\nhref=\"https://redirect.github.com/actions/checkout/issues/2248\">#2248</a>)</li>\n<li>See full diff in <a\nhref=\"https://github.com/actions/checkout/compare/v5...v6\">compare\nview</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility\nscore](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=actions/checkout&package-manager=github_actions&previous-version=5&new-version=6)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't\nalter it yourself. You can also trigger a rebase manually by commenting\n`@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits\nthat have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after\nyour CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge\nand block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating\nit. You can achieve the same result by closing it manually\n- `@dependabot show <dependency name> ignore conditions` will show all\nof the ignore conditions of the specified dependency\n- `@dependabot ignore this major version` will close this PR and stop\nDependabot creating any more for this major version (unless you reopen\nthe PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop\nDependabot creating any more for this minor version (unless you reopen\nthe PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop\nDependabot creating any more for this dependency (unless you reopen the\nPR or upgrade to it yourself)\n\n\n</details>\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>",
          "timestamp": "2025-12-15T18:06:27-05:00",
          "tree_id": "be320154dd0faf19c0566aac4b7c944550fcdd25",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/cf7d6a64036b34e23ab61a3afd79645321bf0c57"
        },
        "date": 1765840594531,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15006474668049222,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.663790278000022 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.0546310181695761,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.30461949100004 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8547185130392555,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1699758279999628 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.544293392566688,
            "unit": "iter/sec",
            "range": "stddev: 0.0022470494171215566",
            "extra": "mean: 86.62288509090517 msec\nrounds: 11"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1580742081735307,
            "unit": "iter/sec",
            "range": "stddev: 0.016375941806961992",
            "extra": "mean: 863.5025224999708 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.0821451741707124,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 12.173569659999998 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.525170250109544,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 180.9898980000071 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.4073205306963832,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 710.5701780000118 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.11793060667715,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 123.18410300002824 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.5653575567527125,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 389.8092090000205 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 3.999722771215079,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 250.01732800001264 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.6004867688664339,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.665315626999984 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 11.319280092423078,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 88.34484100003692 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 3.2886050922080368,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 304.0802930000268 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 33.94885896354225,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 29.456071000026895 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 12.515885474739026,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 79.89846200001693 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 11.05092201875985,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 90.49018700000033 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 3.6557491034229335,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 273.5417480000706 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 11.95238147316645,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 83.66533499997786 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 3.791468863681518,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 263.7500230000569 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.6156301405894804,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 276.57696200003556 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.2332429643719651,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 810.8702250000306 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.27975627367109396,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.5745400340000515 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 8.272467002870233,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 120.88292399994316 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.6385684807048517,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 610.288804999982 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.7729987659863424,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2936631259999558 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 4.904497996528447,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 203.89446599995154 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.6843803657567822,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 593.6901310000167 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17995243+DragaDoncila@users.noreply.github.com",
            "name": "Draga Doncila Pop",
            "username": "DragaDoncila"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fd1acf68b839344153f88f5cfa5781f26a9068ae",
          "message": "Split error annotations into basic and ctc (#324)\n\n# Proposed Change\nPartially addresses #321 \n\nPrior to this PR, we were marking `node` and `edge` errors as annotated\nwhen any metric was computed, so running basic then CTC or vice-versa\nled to one of the metrics being incorrect, because `basic` errors and\n`CTC` errors are not the same flags.\n\nThis PR splits the flags into `basic_node/edge_errors` (used by all\nmetrics except CTC) and `ctc_node/edge_errors` (only used by CTC).\n\n# Types of Changes\n- Bugfix (non-breaking change which fixes an issue)\n\nWhich topics does your change affect? Delete those that do not apply.\n- Track Errors\n- Metrics\n\n# Checklist\nPut an x in the boxes that apply. You can also fill these out after\ncreating the PR. If you're unsure about any of them, don't hesitate to\nask. We're here to help! This is simply a reminder of what we are going\nto look for before merging your code.\n\n- [ ] I have read the developer/contributing docs.\n- [ ] I have added tests that prove that my feature works in various\nsituations or tests the bugfix (if appropriate).\n- [ ] I have checked that I maintained or improved code coverage.\n- [ ] I have checked the benchmarking action to verify that my changes\ndid not adversely affect performance.\n- [ ] I have written docstrings and checked that they render correctly\nin the Read The Docs build (created after the PR is opened).\n- [ ] I have updated the general documentation including Metric\ndescriptions and example notebooks if necessary.\n\n---------\n\nCo-authored-by: Draga Doncila <ddon0001@student.monash.edu>\nCo-authored-by: Caroline Malin-Mayor <cmalinmayor@gmail.com>",
          "timestamp": "2025-12-16T10:32:30+11:00",
          "tree_id": "89720ae3cc920ccdb548e9e73d6adc33e0e09e8b",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/fd1acf68b839344153f88f5cfa5781f26a9068ae"
        },
        "date": 1765842148817,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.15839398100666804,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 6.3133712130002095 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05663153324589949,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.658006815000135 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.8639164269641088,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1575193720000243 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 11.376692454126381,
            "unit": "iter/sec",
            "range": "stddev: 0.0011406913594143749",
            "extra": "mean: 87.89900966667119 msec\nrounds: 12"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1935126123069377,
            "unit": "iter/sec",
            "range": "stddev: 0.002403725356460287",
            "extra": "mean: 837.8629515000284 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.10044088253192528,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 9.95610527100007 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.593708876446237,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 178.7722640001448 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.5109548266731279,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 661.8331550002949 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.427934510290244,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 118.65303400008997 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.7966665569253344,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 357.5685480000175 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.085012542419072,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 244.79728999995132 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.7615341207821517,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.3131387980001819 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 11.539190193934939,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 86.6611940000439 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 3.240168687458074,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 308.62590700007786 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 47.67866638566588,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 20.97374100003435 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.527866945954138,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 73.92148400003862 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 12.12666338710404,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 82.4629140001889 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.18673243665901,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 238.84975100008887 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.71471740620645,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 78.64901499988264 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.3897371404721675,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 227.80407300024308 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 3.758180958637375,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 266.08617600004436 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3006977531962265,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 768.818119000116 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.28634673295285223,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 3.492269632999978 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.268474439950031,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 107.89262100024644 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.9241207289719378,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 519.7179079996204 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8874334396745001,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.1268450739999025 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.762632023631028,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 173.5318159999224 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.9307154795603771,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 517.9427060002126 msec\nrounds: 1"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66853113+pre-commit-ci[bot]@users.noreply.github.com",
            "name": "pre-commit-ci[bot]",
            "username": "pre-commit-ci[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "963bdd0f3e846a570948f40137462c7ad8631b2d",
          "message": "ci(pre-commit.ci): autoupdate (#329)\n\n<!--pre-commit.ci start-->\nupdates:\n- [github.com/astral-sh/ruff-pre-commit: v0.14.7 →\nv0.14.10](https://github.com/astral-sh/ruff-pre-commit/compare/v0.14.7...v0.14.10)\n- [github.com/pre-commit/mirrors-mypy: v1.19.0 →\nv1.19.1](https://github.com/pre-commit/mirrors-mypy/compare/v1.19.0...v1.19.1)\n<!--pre-commit.ci end-->\n\nCo-authored-by: pre-commit-ci[bot] <66853113+pre-commit-ci[bot]@users.noreply.github.com>",
          "timestamp": "2026-01-06T10:41:57-05:00",
          "tree_id": "39a179958375fa7f21e9134b73a627ada0204aa4",
          "url": "https://github.com/live-image-tracking-tools/traccuracy/commit/963bdd0f3e846a570948f40137462c7ad8631b2d"
        },
        "date": 1767714785839,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[2d]",
            "value": 0.17576989743085214,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 5.689256321000016 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_gt_ctc_data[3d]",
            "value": 0.05620143709552028,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 17.79313931599995 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_pred_ctc_data[2d]",
            "value": 0.941927540115949,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.061652788999993 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_load_points",
            "value": 15.015583112092976,
            "unit": "iter/sec",
            "range": "stddev: 0.0009331323041524589",
            "extra": "mean: 66.59748026665966 msec\nrounds: 15"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[2d]",
            "value": 1.1922260696450617,
            "unit": "iter/sec",
            "range": "stddev: 0.0006112775488750356",
            "extra": "mean: 838.7670974999821 msec\nrounds: 2"
          },
          {
            "name": "tests/bench.py::test_ctc_checks[3d]",
            "value": 0.05487290776251917,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 18.22392945400003 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[2d]",
            "value": 5.951174635113847,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 168.03405399997473 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_matcher[3d]",
            "value": 1.5770666201923171,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 634.0886220000357 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[2d]",
            "value": 8.280088294555023,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 120.77165900001319 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_ctc_metrics[3d]",
            "value": 2.867531456611988,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 348.7320070000237 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[2d]",
            "value": 4.074430008734693,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 245.4331029999821 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_matcher[3d]",
            "value": 0.5558471155871018,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.7990558410000403 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[2d]",
            "value": 3.7784720955356974,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 264.657241000009 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_matcher[3d]",
            "value": 3.908013063455829,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 255.88450800000828 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[2d]",
            "value": 39.09370471739634,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 25.579565999919396 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_point_seg_matcher[3d]",
            "value": 13.396565300163775,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 74.64599900004032 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[2d]",
            "value": 11.726412936013604,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 85.27757000001657 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_iou_div_metrics[3d]",
            "value": 4.330225396330838,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 230.93486099992333 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[2d]",
            "value": 12.797140811624388,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 78.14245499992012 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_basic_metrics[3d]",
            "value": 4.4998159192814375,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 222.23131299995202 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[2d]",
            "value": 4.030527732955991,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 248.10646800005998 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_overlap_metrics[3d]",
            "value": 1.3985890871051172,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 715.0062940000907 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[2d]",
            "value": 0.34426257463446075,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 2.9047595460000366 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_cca_metric[3d]",
            "value": 9.363831757865016,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 106.79388799997014 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[2d]",
            "value": 1.9409389474993632,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 515.2145570000357 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_chota_metric[3d]",
            "value": 0.8245214241429102,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 1.2128247619999684 sec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[2d]",
            "value": 5.918265358314725,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 168.96842900007414 msec\nrounds: 1"
          },
          {
            "name": "tests/bench.py::test_complete_tracks_metric[3d]",
            "value": 1.9636288997043199,
            "unit": "iter/sec",
            "range": "stddev: 0",
            "extra": "mean: 509.26119500002187 msec\nrounds: 1"
          }
        ]
      }
    ]
  }
}