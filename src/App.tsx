import {
  Button,
  Card,
  CardBody, CardHeader, Stack,
  Text
} from "@chakra-ui/react";

import {Link} from "react-router-dom";

export default function App() {
  return (
    <div>
      <Card>
        <CardHeader
          textAlign='center'
        >
          <Text
            as='b'
            fontSize='3xl'
          >
            Welcome to audio visualizer
          </Text>

          <Text
            mt={-2}
            textAlign='left'
            color='darkGray'
          >
            Choose what audio you want to visualize
          </Text>
        </CardHeader>

        <CardBody>
          <Stack>
            <Link to='/visualizer/audio'>
              <Button
                colorScheme='blue'
                w={'100%'}
              >
                    From song
              </Button>
            </Link>

            <Link to='/visualizer/microphone'>
              <Button
                colorScheme='blue'
                w={'100%'}
              >
                From microphone
              </Button>
            </Link>
          </Stack>
        </CardBody>
      </Card>
    </div>
  )
}
